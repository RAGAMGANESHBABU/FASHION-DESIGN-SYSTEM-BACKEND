const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, deleteOrder, updateOrder } = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.delete('/:id', deleteOrder); // ✅ delete endpoint
// routes/orderRoutes.js
router.patch('/:id', updateOrder);


module.exports = router;
