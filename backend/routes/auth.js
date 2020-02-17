const authController = require('../controllers/authController');
const router = require('express').Router();
const isAuth = require('../middleware/is-auth');

router.post('/register', authController.postRegistration);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/', isAuth, (req, res, next) => { return res.status(200).json({ success: true, msg: 'Token valid' }) });

router.get('/confirm/:token', authController.getUserConfirmation);

module.exports = router;