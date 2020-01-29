const User = require('../models/user');
const Notification = require('../models/notifications');
const History = require('../models/history');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const transporter = require('../config/sendgrid');

exports.postRegistration = (req, res, next) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ username: username })
    .then(user => {
      if (user) {
        return res.status(400).json('Username already exists!');
      }
      crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          console.log(err);
          return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        let user;
        bcrypt.hash(password, 12)
          .then(hashedPassword => {
            user = new User({
              username: username,
              firstname: firstname,
              lastname: lastname,
              email: email,
              password: hashedPassword,
              resetToken: token,
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
              historyList: ["Entry"]
            });
            history.save();
            res.json('User created!')
            return transporter.sendMail({
              to: email,
              from: 'we@matcha.com',
              subject: 'Signup succeeded!',
              html: `
                    <h1>You successfully signed up!</h1>
                    <p>Click this <a href="http://localhost:5000/confirm/${token}">link</a> to continue.</p>
                  `
            });
          })
          .catch(err => {
            console.log(err);
            res.status(400).json('Error: ' + err);
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
        return res.status(400).json('User not found!');
      }
      if (!user.activeStatus) {
        return res.status(400).json('User not active!');
      }
      bcrypt
        .compare(password, user.password)
        .then(match => {
          if (!match) {
            return res.status(400).json('Password is invalid!');
          }
          req.session.isLoggedIn = true;
          req.session.user = user;
          const app = require('../app');
          let sessionResult;
          app.connection.collection('sessions').findOne({ _id: req.sessionID }, (err, session) => {
            if (session) {
              sessionResult = 'SessionID found';
            } else {
              sessionResult = 'SessionID NOT found';
            }
            return res.status(200).json(`User logged in! Session token: ${req.sessionID}` + ' Oh and : ' + sessionResult);
          });
        })
    })
    .catch(err => {
      return res.status(400).json('Error: ' + err);
    });
}

exports.postLogout = (req, res, next) => {
  const app = require('../app');
  app.connection.collection('sessions').findOne({ _id: req.sessionID }, (err, session) => {
    if (session) {
      console.log('SessionID found');
    } else {
      console.log('SessionID not found');
    }
  });
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.status(400).json('Error logging user out: ' + err);
    }
    let sessionResult;
    app.connection.collection('sessions').findOne({ _id: req.sessionID }, (err, session) => {
      if (session) {
        sessionResult = 'SessionID found';
      } else {
        sessionResult = 'SessionID NOT found';
      }
      return res.status(200).json('User successfully logged out!' + ' Oh and : ' + sessionResult);
    });
  })
};

exports.getUserConfirmation = (req, res, next) => {
  const token = req.params.token;

  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(400).json('Invalid token!');
      }
      user.activeStatus = true;
      user.save(err => {
        if (err) {
          return res.status(400).json('User could not be created!');
        }
        return res.status(200).json('User is now active!');
      })
    })
    .catch(err => {
      return res.status(400).json('Error: ' + err);
    });
}