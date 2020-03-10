const verifyToken = require('./jwtAuth').verifyToken;

module.exports = (req, res, next) => {
  const token = req.header('Authorization') || req.body.token; // req.body.token needs to be removed after
  // const token = req.header('Authorization');
  verifyToken(token)
  .then((response) => {
    if (response.success === false)
      return res.status(400).json({ success: false, msg: 'Token invalid'});
    req.user = response.user;
    next();
  })
  .catch(err => {
    return res.status(500).json({ success: false, msg: 'Internal server error', response});
  })
}