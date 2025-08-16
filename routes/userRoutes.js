const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');

const router = express.Router();

// POST /api/users/register
router.post('/register', registerUser);

// POST /api/users/login
router.post('/login', loginUser);

// GET /api/users/profile/:id
router.get('/profile/:id', getUserProfile);

module.exports = router;
