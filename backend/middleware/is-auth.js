const app = require('../app');

module.exports = (req, res, next) => {
    app.connection.collection('sessions').findOne({_id: req.sessionID}, (err, session) => {
      if (!session) {
          return res.status(400).json(`No user is logged in!`);
      }
      next();
    });
}