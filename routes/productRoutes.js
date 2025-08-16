const express = require('express');
const { getAllProducts, addProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

// GET /api/products
router.get('/', getAllProducts);

// POST /api/products
router.post('/', addProduct);

// DELETE /api/products/:id
router.delete('/:id', deleteProduct);

module.exports = router;
