const express = require('express');
const router = express.Router();
const reviewController = require('../app/controllers/reviewController');


router.post('/create',reviewController.createReview)
router.get('/:id', reviewController.getReviews);

module.exports = router ;