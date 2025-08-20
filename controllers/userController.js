const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body; // include isAdmin if needed
    if(!name || !email || !password) 
      return res.status(400).json({ error: 'All fields required' });

    const existing = await User.findOne({ email });
    if(existing) 
      return res.status(400).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ 
      name, 
      email, 
      password: hashed, 
      isAdmin: isAdmin || false // default false
    });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch(err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) 
      return res.status(400).json({ error: 'All fields required' });

    const user = await User.findOne({ email });
    if(!user) 
      return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) 
      return res.status(400).json({ error: 'Invalid credentials' });

    res.json({ message: 'Login successful', user });
  } catch(err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch(err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
