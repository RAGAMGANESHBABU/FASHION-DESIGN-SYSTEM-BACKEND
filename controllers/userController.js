const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body; // include isAdmin if needed
    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields required' });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashed,
      isAdmin: isAdmin || false // default false
    });
    await user.save();

    // remove password before sending
    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({ message: 'User registered successfully', user: userObj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'All fields required' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: 'Invalid credentials' });

    const userObj = user.toObject();
    delete userObj.password;

    res.json({ message: 'Login successful', user: userObj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Use User.find() (not findall), and exclude passwords
    const users = await User.find().select('-password');

    // return empty array if none — better than 404 for collections
    return res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, getAllUsers };
