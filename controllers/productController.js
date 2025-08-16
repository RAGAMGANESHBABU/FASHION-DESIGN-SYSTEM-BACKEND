const Product = require('../models/Product');

// Get all products (with optional category filter)
const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query; // frontend nundi category query

    let filter = {};
    if (category && category !== 'All') {
      filter.category = category; // filter by category
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Add product
const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;

    if (!name || !price || !description || !category || !image) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const product = new Product({
      name,
      price: Number(price),
      description,
      category,
      image, // store base64 string
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product' });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = { getAllProducts, addProduct, deleteProduct };
