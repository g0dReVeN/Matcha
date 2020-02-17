const jwt = require('jsonwebtoken');
const User = require('../models/user');
const jwt_private_key = process.env.JWT_PRIVATE_KEY;
const jwt_public_key = process.env.JWT_PUBLIC_KEY;

exports.signToken = (user) => {
  return new Promise(token => {
    // console.log(jwt_private_key);
    const userData = user.toObject();
    delete userData.password;
    jwt.sign(userData, jwt_private_key, {
      algorithm: 'ES256',
      expiresIn: 60 * 60
    }, (err, newToken) => {
      if (err) {
        console.log(`Error creating token: ${err}`);
        token(null);
      }
      token(newToken);
    });
  });
}

exports.verifyToken = (token) => {
  return new Promise((response) => {
    if (!token) {
      return response({ success: false, msg: "No token provided" });
    }
    jwt.verify(token, jwt_public_key, (err, decodedData) => {
      if (err) {
        return response({ success: false, msg: err });
      }
      User.findById(decodedData._id, (err, user) => {
        if (!user) {
          return response({ success: false, msg: "User does not exist." });
        }
        return response({ success: true, msg: "Token valid!", user: user });
      });
    });
  });
}