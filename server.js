const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// DB Connection and Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
