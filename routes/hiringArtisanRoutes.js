const express = require('express');
const { createHiringRequest, getHiringRequests } = require('../controller/hiringArtisanController');

const router = express.Router();

// Route to create a new hiring request
router.post('/hiring', createHiringRequest);

// Route to get all hiring requests
router.get('/hiring', getHiringRequests);

module.exports = router;