const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.post('/register',userController.register)
router.post('/login', userController.login);
router.post('/updateProfile',userController.updateProfile)
router.get('/getProfile/:id',userController.getProfile) 

module.exports = router;
