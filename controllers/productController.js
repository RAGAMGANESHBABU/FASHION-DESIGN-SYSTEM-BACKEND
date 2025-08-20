const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if(category && category !== 'All') filter.category = category;

    const products = await Product.find(filter);

    res.json(products);
    
  } catch(err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, image } = req.body;

    if (!name || !price || !description || !category || !image) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category, image },
      { new: true } // 👈 updated product return avvali
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated', product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};


const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    if(!name || !price || !description || !category || !image) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const product = new Product({ name, price, description, category, image });
    await product.save();

    res.status(201).json({ message: 'Product added', product });
  } catch(err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
  } catch(err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = { getAllProducts, addProduct, deleteProduct, updateProduct};
