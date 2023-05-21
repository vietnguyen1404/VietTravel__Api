const express = require('express');
const router = express.Router();
const bookingController = require('../app/controllers/bookingController');

router.post('/create', bookingController.create);
router.get('/',bookingController.getListBooking);
router.post('/:id/change-status', bookingController.ChangeStatusBooking);
module.exports = router;
