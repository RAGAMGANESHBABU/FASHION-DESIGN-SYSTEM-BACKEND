const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes'); // ✅ Products routes

dotenv.config();
const app = express();

// Security headers
app.use(helmet());

// Logging
app.use(morgan('dev'));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, try later',
}));

// Body parser
app.use(express.json({ limit: '10mb' })); // base64 images

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes); // ✅ Mount products

// Test route
app.get('/', (req, res) => {
  res.send('✅ Backend running');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ DB connection error:', err.message);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
