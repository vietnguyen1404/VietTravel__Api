const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/authController');

router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.get('/logout',authController.Logout)
module.exports = router;
