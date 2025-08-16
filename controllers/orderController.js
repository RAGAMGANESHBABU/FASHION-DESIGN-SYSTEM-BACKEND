const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { user, products, isCart } = req.body;

    if (!user || !products || products.length === 0) {
      return res.status(400).json({ error: "User and products are required" });
    }

    const newOrder = new Order({
      user,
      products,
      isCart
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("❌ Error creating order:", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products').populate('user');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = { createOrder, getAllOrders };
