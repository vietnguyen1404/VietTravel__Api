const express = require('express');
const router = express.Router();
const upload = require('../app/middleware/save-image')
const tourController = require('../app/controllers/TourController');

router.get('/list', tourController.getTours);
router.get('/detail/:id', tourController.getTour);
router.post('/create',upload.any() ,tourController.createTour);
router.post('/delete/:id', tourController.deleteTour);
router.post('/:id',upload.any(),tourController.updateTour);


module.exports = router ;