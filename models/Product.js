const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be greater than or equal to 0']
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  category: {
    type: String,
    default: 'Uncategorized',
    trim: true
  }
}, {
  timestamps: true // ✅ adds createdAt & updatedAt fields
});

module.exports = mongoose.model('Product', productSchema);
