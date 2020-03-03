const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const ResetToken = require('../models/resetToken');

const signToken = require('../middleware/jwtAuth').signToken;
const transporter = require('../config/nodemailer');

exports.postRegistration = (req, res, next) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ username: username })
    .then(user => {
      if (user)
        return res.status(400).json({ success: false, msg: 'Username already exists' });
      crypto.randomBytes(32, (err, buffer) => {
        if (err)
          return res.status(500).json({ success: false, msg: 'Internal server error', err });
        const statusToken = buffer.toString('hex');
        let user;
        bcrypt.hash(password, 12)
          .then(hashedPassword => {
            user = new User({
              username: username,
              firstname: firstname,
              lastname: lastname,
              email: email,
              password: hashedPassword
            });
            user.save()
              .then(newUser => {
                const resetToken = new ResetToken({
                  userId: newUser._id,
                  resetToken: statusToken,
                  resetTokenExpiration: Date.now() + 864000000
                });
                resetToken.save();
              })
          })
          .then(result => {
            res.status(201).json({ success: true, msg: "User created" });
            return transporter.sendMail({
              to: email,
              from: 'thepeople@matcha.com',
              subject: 'Signup succeeded!',
              html: `
                    <h1>You successfully signed up!</h1>
                    <p>Click this <a href="http://localhost:3000/confirm/${statusToken}">link</a> to continue.</p>
                  `
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ success: false, msg: 'Internal server error', err });
          });
      });
    });
}

// Adding multiple users for testing
// exports.postRegistration = (req, res, next) => {

//   req.body.forEach(element => {
//     const username = element.username;
//     const firstname = element.firstname;
//     const lastname = element.lastname;
//     const email = element.email;
//     const password = element.password;

//     User.findOne({ username: username })
//       .then(user => {
//         if (!user) {
//           crypto.randomBytes(32, (err, buffer) => {
//             if (err) {
//               console.log(err);
//             }
//             const statusToken = buffer.toString('hex');
//             let user;
//             bcrypt.hash(password, 12)
//               .then(hashedPassword => {
//                 user = new User({
//                   username: username,
//                   firstname: firstname,
//                   lastname: lastname,
//                   email: email,
//                   password: hashedPassword,
//                   activeStatus: true,
//                   fameRating: Math.floor(Math.random() * 101)
//                 });
//                 user.save()
//                 .then(newUser => {
//                   const resetToken = new ResetToken({
//                     userId: newUser._id,
//                     resetToken: statusToken,
//                     resetTokenExpiration: Date.now() + 864000000
//                   });
//                   resetToken.save();
//                 });
//               })
//               .catch(err => {
//                 console.log(err);
//               });
//           });
//         }
//       });
//   });
//   return res.status(200).json({ success: true, msg: 'Users successfully created!' });
// }

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username })
    .then(user => {
      if (!user)
        return res.status(400).json({ success: false, msg: 'User not found' });
      if (!user.activeStatus)
        return res.status(403).json({ success: false, msg: 'User not active' });
      bcrypt
        .compare(password, user.password)
        .then(match => {
          if (!match)
            return res.status(401).json({ success: false, msg: 'Password is invalid' });
          signToken(user)
            .then(token => {
              if (!token) {
                return res.status(500).json({ success: false, msg: 'Token could not be generated at this time' });
              }
              return res.status(200).json({ success: true, msg: "User exists. Token attached", token });
            })
        })
    })
    .catch(err => {
      return res.status(500).json({ success: false, msg: 'Internal server error', err });
    });
}

exports.getUserConfirmation = (req, res, next) => {
  const resetToken = req.body.token;

  ResetToken.findOne({ resetToken: resetToken, resetTokenExpiration: { $gt: Date.now() } })
    .then(result => {
      User.findById(result.userId)
        .then(user => {
          if (!user)
            return res.status(400).json({ success: false, msg: 'Invalid token given' });
          user.activeStatus = true;
          user.save(err => {
            if (err)
              return res.status(500).json({ success: false, msg: 'Internal server error', error });
            const token = signToken(user);
            if (!token)
              return res.status(500).json({ success: false, msg: 'Token could not be generated at this time' });
            return res.status(200).json({ success: true, msg: "User verified. Token attached", token });
          })
        })
        .catch(err => {
          return res.status(500).json({ success: false, msg: 'Internal server error', err });
        });
    })
    .catch(err => {
      return res.status(500).json({ success: false, msg: 'Internal server error', err });
    });

}

exports.postForgotPassword = (req, res, next) => {
  const username = req.body.username;
  const forgot = req.body.forgot;

  User.findOne({ username: username })
    .then(user => {
      if (!user)
        return res.status(400).json({ success: false, msg: 'User does not exist' })
      crypto.randomBytes(32, (err, buffer) => {
        if (err)
          return res.status(500).json({ success: false, msg: 'Internal server error', err });
        const statusToken = buffer.toString('hex');
        ResetToken.findOne({ userId: user._id })
          .then(tokenObject => {
            tokenObject.resetToken = statusToken;
            tokenObject.resetTokenExpiration = Date.now() + 864000000;
            tokenObject.save();
            if (forgot) {
              res.status(200).json({ success: true, msg: 'Change password email has been sent to the user' });
              return transporter.sendMail({
                to: user.email,
                from: 'thepeople@matcha.com',
                subject: 'Request for password change',
                html: `
                    <h1>Forgot Password!</h1>
                    <p>Click this <a href="http://localhost:3000/changePassword/${statusToken}">link</a> to continue.</p>
                  `
              });
            }
            return res.status(200).json({ success: true, msg: 'Token attached', resetToken: statusToken });
          })
          .catch(err => {
            return res.status(500).json({ status: false, msg: 'Internal server error', err });
          });
      });
    })
    .catch(err => {
      return res.status(500).json({ status: false, msg: 'Internal server error', err });
    });
}

exports.postChangePassword = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        return res.status(400).json({ success: false, msg: 'Invalid username' })
      }
      bcrypt.hash(password, 12)
        .then(hashedPassword => {
          user.password = hashedPassword;
          user.save();
          return res.status(200).json({ success: true, msg: 'User successfully changed their password' });
        })
        .catch(err => {
          return res.status(500).json({ success: false, msg: 'Internal server error', err });
        })
    })
    .catch(err => {
      return res.status(500).json({ success: false, msg: 'Internal server error', err });
    });
}

exports.postValidateResetToken = (req, res, next) => {
  const resetToken = req.body.resetToken;

  ResetToken.findOne({ resetToken: resetToken, resetTokenExpiration: { $gt: Date.now() } })
    .then(resetObject => {
      if (resetObject)
        return res.status(200).json({ success: true, msg: "Reset Token valid" });
      return res.status(400).json({ success: false, msg: "Reset Token invalid" });
    })
    .catch(err => {
      return res.status(500).json({ success: false, msg: 'Internal server error', err });
    });
}