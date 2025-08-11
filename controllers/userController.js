const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create and save user
    const user = new User({ name, email, password: hash });
    await user.save();

    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    // Generate JWT token with 1 day expiry
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send token and safe user info
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // Authorization check: only user can access own profile
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
