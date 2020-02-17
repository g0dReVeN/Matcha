const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Notification = require('../models/notifications');
const History = require('../models/history');

const signToken = require('../middleware/jwtAuth').signToken;

const transporter = require('../config/sendgrid');

const session_name = process.env.SESSION_NAME;

exports.postRegistration = (req, res, next) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ username: username })
    .then(user => {
      if (user) {
        return res.status(400).json({ success: false, msg: 'Username already exists!' });
      }
      crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ success: false, msg: 'Error', err });
        }
        const statusToken = buffer.toString('hex');
        let user;
        bcrypt.hash(password, 12)
          .then(hashedPassword => {
            user = new User({
              username: username,
              firstname: firstname,
              lastname: lastname,
              email: email,
              password: hashedPassword,
              resetToken: statusToken,
              resetTokenExpiration: Date.now() + 864000000
            });
            user.save();
          })
          .then(result => {
            const notification = new Notification({
              userId: user._id,
              notificationList: []
            });
            notification.save();
            const history = new History({
              userId: user._id,
              historyList: []
            });
            history.save();
            res.status(200).json({ success: true, msg: "User created!" });
            return transporter.sendMail({
              to: email,
              from: 'we@matcha.com',
              subject: 'Signup succeeded!',
              html: `
                    <h1>You successfully signed up!</h1>
                    <p>Click this <a href="http://localhost:5000/confirm/${statusToken}">link</a> to continue.</p>
                  `
            });
          })
          .catch(err => {
            console.log(err);
            res.status(400).json({ success: false, msg: 'Error', err });
          });
      });
    });

}

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        return res.status(400).json({ success: false, msg: 'User not found!' });
      }
      if (!user.activeStatus) {
        return res.status(400).json({ success: false, msg: 'User not active!' });
      }
      bcrypt
        .compare(password, user.password)
        .then(match => {
          if (!match) {
            return res.status(400).json({ success: false, msg: 'Password is invalid!' });
          }

          signToken(user)
            .then(token => {
              if (!token) {
                return res.status(400).json({ success: false, msg: 'Token could not be generated at this time' });
              }
              return res.status(200).json({ success: true, msg: "User created! Token attached.", token });
            })
        })
    })
    .catch(err => {
      return res.status(400).json({ success: false, msg: 'Error', err });
    });
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, msg: 'Error logging user out', err });
    }
    res.clearCookie(session_name);
    return res.status(200).json({ success: true, msg: 'User has successfully been logged out!' });
  });
};

exports.getUserConfirmation = (req, res, next) => {
  const resetToken = req.params.token;

  User.findOne({ resetToken: resetToken, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(400).json({ success: false, msg: 'Invalid token!' });
      }
      user.activeStatus = true;
      user.save(err => {
        if (err) {
          return res.status(400).json({ success: false, msg: 'User could not be verified!' });
        }
        const token = signToken(user);
        if (!token)
          return res.status(400).json({ success: false, msg: 'Token could not be generated at this time' });
        return res.status(200).json({ success: true, msg: 'User is now active!', token });
      })
    })
    .catch(err => {
      return res.status(400).json({ success: false, msg: 'Error', err });
    });
}