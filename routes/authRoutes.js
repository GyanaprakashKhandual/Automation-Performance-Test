const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middleware/validateUser');

// Apply validation middleware before controller
router.post('/signup', validateSignup, registerUser);
router.post('/login', validateLogin, loginUser);

module.exports = router;
