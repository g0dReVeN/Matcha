const express = require('express');

const adminController = require('../controllers/adminController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/userInfo', isAuth , adminController.getUserObject);

router.post('/profile', isAuth , adminController.postProfile);

router.post('/addHistory', isAuth , adminController.postHistory);

module.exports = router;