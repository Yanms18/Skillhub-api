const express = require('express');
const { createHiringRequest, getHiringRequests } = require('../controller/hiringArtisanController');

const router = express.Router();

// Route to create a new hiring request
router.post('/hire', createHiringRequest);

// Route to get all hiring requests
router.get('/hire', getHiringRequests);

module.exports = router;