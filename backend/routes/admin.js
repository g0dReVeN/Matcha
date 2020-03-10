const express = require('express');

const adminController = require('../controllers/adminController');
const isAuth = require('../middleware/is-auth');
const imgUpload = require('../middleware/multer');

const router = express.Router();

// router.get('/users', isAuth , adminController.getFilteredUsers);

router.post('/profile', isAuth , adminController.postProfile);

router.post('/addHistory', isAuth , adminController.postHistory);

router.get('/retrieveFilteredUsers', isAuth, adminController.getFilteredUsers);

router.post('/addImages', /** isAuth, */ imgUpload.any(), adminController.postUserImages);

router.get('/userImages/:username', isAuth, adminController.getUserImages);

module.exports = router;