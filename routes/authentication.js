const express = require('express');
const authController = require('../controller/authcontroller');
const { validateSignup, validateSignin } = require('../Middleware/validator');

const router = express.Router();

// Signup Route with validation middleware
router.post('/signup', validateSignup, authController.signup);

// Signin Route with validation middleware
router.post('/signin', validateSignin, authController.signin);

module.exports = router;