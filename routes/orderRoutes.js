const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getCartOrders, getPurchasedOrders } = require('../controllers/orderController');

// Create order (Add to Cart / Buy Now)
router.post('/', createOrder);

// Get all orders
router.get('/', getAllOrders);

// Get only cart items
router.get('/cart', getCartOrders);

// Get only purchased items
router.get('/purchased', getPurchasedOrders);

module.exports = router;
