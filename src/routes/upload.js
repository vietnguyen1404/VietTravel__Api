const express = require('express');
const router = express.Router();

const uploadController = require('../app/controllers/uploadController');
const upload = require('../app/middleware/save-image');

router.post('/', upload.any(),uploadController.saveImage);

module.exports = router ;