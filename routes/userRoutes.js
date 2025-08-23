// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected: get a profile (any logged-in user can fetch — you can restrict to self/admin if desired)
router.get('/:id', protect, getUserProfile);

// Admin routes
router.get('/', protect, adminOnly, getAllUsers);
router.patch('/:id', protect, adminOnly, updateUser); // admin updates a user
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;
