const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct, deleteProduct } = require('../controllers/productController');

router.get('/', getAllProducts);
router.post('/', addProduct); // base64 image in JSON
router.delete('/:id', deleteProduct);

module.exports = router;
