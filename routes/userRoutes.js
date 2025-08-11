const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get user profile (no protect middleware)
router.get('/profile/:id', getUserProfile);

module.exports = router;
