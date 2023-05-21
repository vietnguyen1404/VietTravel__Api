const express = require('express');
const router = express.Router();

const destinationController = require('../app/controllers/destinationController');

router.post('/create', destinationController.create);
router.get('/:id',destinationController.getDestination);
router.post('/:id',destinationController.updateDestination)
router.get('/',destinationController.getListDestination);

module.exports = router ;