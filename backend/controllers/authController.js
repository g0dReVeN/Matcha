const User = require('../models/user');
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
    });

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    bcrypt.hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: hashedPassword,
          resetToken: token,
          resetTokenExpiration: Date.now() + 864000000
        });
        return user.save();
      })
      .then(result => {
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
          return res.status(200).json(`User logged in! Session token: ${req.sessionID}`);
        })
    })
    .catch(err => {
      return res.status(400).json('Error: ' + err);
    });
}

exports.postLogout = (req, res, next) => {
  console.log(req.session);
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.status(400).json('Error logging user out: ' + err);
    }
  });
  console.log(req.session);
  return res.status(200).json('User successfully logged out!');
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