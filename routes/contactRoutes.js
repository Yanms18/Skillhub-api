const express = require('express');
const { createContactMessage, getContactMessages } = require('../controller/contactController');
const { validateContactMessage } = require('../Middleware/validator');

const router = express.Router();

router.post('/send', validateContactMessage, createContactMessage);
router.get('/recieve', getContactMessages);

module.exports = router;