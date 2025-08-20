const express = require('express');
const { registerUser, loginUser, getUserProfile, createAdmin } = require('../controllers/userController');
const router = express.Router();

// Register normal user
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Get user profile
router.get('/profile/:id', getUserProfile);



module.exports = router;
