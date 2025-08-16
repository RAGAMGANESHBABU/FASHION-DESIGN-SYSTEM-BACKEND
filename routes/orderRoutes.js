const express = require('express');
const { createOrder, getAllOrders } = require('../controllers/orderController');
const router = express.Router();

router.post('/', createOrder);   // Add order (cart or buy)
router.get('/', getAllOrders);  // Fetch all orders

module.exports = router;
