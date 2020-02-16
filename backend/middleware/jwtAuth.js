const jwt = require('jsonwebtoken');
const User = require('../models/user');
const jwt_private_key = process.env.JWT_PRIVATE_KEY;

exports.signToken = (user) => {
  return new Promise(token => {
    console.log(jwt_private_key);
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

exports.verifyToken = (req, res, next) => {
  const token = req.get('token') || req.body.token;
  if (!token)
    return res.json({ success: false, msg: "No token provided" });
  jwt.verify(token, jwt_private_key, (err, decodedData) => {
    if (err)
      return res.json({ success: false, msg: "Invalid token." });
    User.findById(decodedData._id, (err, user) => {
      if (!user) return res.json({ success: false, msg: "Invalid token." });
      req.user = user;
      next();
    });
  });
}