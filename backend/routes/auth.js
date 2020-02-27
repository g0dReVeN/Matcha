const authController = require('../controllers/authController');
const router = require('express').Router();
const isAuth = require('../middleware/is-auth');

router.post('/register', authController.postRegistration);

router.post('/login', authController.postLogin);

router.post('/forgotPassword', authController.postForgotPassword);

router.post('/changePassword', authController.postChangePassword);

router.post('/validateResetToken', authController.postValidateResetToken);

router.get('/', isAuth, (req, res, next) => { return res.status(200).json({ success: true, msg: 'Token valid' }) });

router.post('/confirm', authController.getUserConfirmation);

module.exports = router;