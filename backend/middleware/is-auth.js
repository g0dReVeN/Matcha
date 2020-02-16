const jwt = require('jsonwebtoken');

const User = require('../models/user');

const jwt_private_key = process.env.JWT_PRIVATE_KEY;

module.exports = (req, res, next) => {
  const token = req.get('Authorization') || req.body.token;
  if (!token) {
    return res.json({ success: false, message: "No token provided" });
  }
  jwt.verify(token, jwt_private_key, (err, decodedData) => {
    if (err) {
      return res.json({ success: false, message: "Invalid token." });
    }
    User.findById(decodedData._id, (err, user) => {
      if (!user) {
        return res.json({ success: false, message: "Invalid token." });
      }
      req.user = user;
      next();
    })
  })
}