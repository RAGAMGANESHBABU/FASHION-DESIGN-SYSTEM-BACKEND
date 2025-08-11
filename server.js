const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

let isConnected;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
  console.log('✅ MongoDB connected');
}

connectToDatabase().catch(err => {
  console.error('❌ DB Connection error:', err.message);
});

// Export app for Vercel serverless
module.exports = app;
