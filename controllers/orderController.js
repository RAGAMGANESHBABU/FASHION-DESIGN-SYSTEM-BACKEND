// controllers/orderController.js
const Order = require('../models/Order');

// ✅ Create Order (Buy or Add to Cart)
const createOrder = async (req, res) => {
  try {
    const { productId, quantity, isCart } = req.body;

    const newOrder = new Order({
      productId,
      quantity,
      isCart   // true = Cart, false = Direct Order
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// ✅ Get All Orders (Buy + Cart)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('productId'); // product details populate
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// ✅ Get Only Cart Items
const getCartOrders = async (req, res) => {
  try {
    const cartOrders = await Order.find({ isCart: true }).populate('productId');
    res.json(cartOrders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart orders' });
  }
};

// ✅ Get Only Purchased Orders
const getPurchasedOrders = async (req, res) => {
  try {
    const purchasedOrders = await Order.find({ isCart: false }).populate('productId');
    res.json(purchasedOrders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch purchased orders' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getCartOrders,
  getPurchasedOrders
};
