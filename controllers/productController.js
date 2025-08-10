const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const category = req.query.category;

    const filter = category && category !== 'All' ? { category } : {};

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};



const addProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const image = req.file.filename;

    const newProduct = new Product({
      name,
      price,
      description,
      image,
      category   // ✅ ensure this is saved
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};


const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct
};
