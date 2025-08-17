const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, deleteOrder } = require('../controllers/ordersController');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.delete('/:id', deleteOrder); // ✅ delete endpoint

module.exports = router;
