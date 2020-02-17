const verifyToken = require('./jwtAuth').verifyToken;

module.exports = (req, res, next) => {
  const otherToken = req.get('Authorization')
  const token = req.header('Authorization') || req.body.token;
  console.log(token + `\n\n\n` + otherToken);
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