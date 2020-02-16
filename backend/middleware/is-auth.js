const verifyToken = require('./jwtAuth').verifyToken;

module.exports = (req, res, next) => {
  const token = req.get('Authorization') || req.body.token;
  verifyToken(token)
  .then((response) => {
    if (response.success === false) {
      console.log(response);
      return res.status(400).json(response);
    }
    req.user = response.user;
    next();
  })
  .catch(err => {
    console.log(err);
  })
}