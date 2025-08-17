const express = require('express');
const { createOrder, getAllOrders } = require('../controllers/orderController');
const router = express.Router();

// Create a new order (cart or buy)
router.post('/', createOrder);

// Get all orders
router.get('/', getAllOrders);

module.exports = router;
