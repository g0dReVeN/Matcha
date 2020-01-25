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

  User.findOne({username: username})
  .then(user => {
    if (user) {
      return res.status(400).json('Username already exists!');
    }
  })

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
          from: 'we@camagru-2.0.com',
          subject: 'Signup succeeded!',
          html: `
                <h1>You successfully signed up!</h1>
                <p>Click this <a href="http://localhost:3000/confirm/${token}">link</a> to continue.</p>
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
        return res.status(200).json('User logged in!');
      })
    })
    .catch(err => {
      return res.status(400).json('Error: ' + err);
    });
}