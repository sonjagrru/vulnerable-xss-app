const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');

router.get('/:email', feedController.getFeed);

module.exports = router;