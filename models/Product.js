const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String  // ✅ this must be here
});

module.exports = mongoose.model('Product', productSchema);
