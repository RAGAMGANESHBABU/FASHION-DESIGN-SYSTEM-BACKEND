const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');

// CRUD endpoints
router.post('/', createOrder);       // create
router.get('/', getAllOrders);       // read all
router.patch('/:id', updateOrder);   // update (checkout)
router.delete('/:id', deleteOrder);  // remove

module.exports = router;
