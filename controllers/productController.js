const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const category = req.query.category;
    const filter = category && category !== 'All' ? { category } : {};

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    // File check
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const newProduct = new Product({
      name,
      price: Number(price), // ensure it's a number
      description,
      image: req.file.filename,
      category: category || 'Uncategorized'
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product', details: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', details: err.message });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct
};
