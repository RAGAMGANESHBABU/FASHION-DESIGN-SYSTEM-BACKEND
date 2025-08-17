const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  try {
    const { user, product, isCart } = req.body;

    if (!user || !product) {
      return res.status(400).json({ error: "User and product are required" });
    }

    const newOrder = new Order({
      user,
      product,  // single product
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
    const orders = await Order.find()
      .populate('product') // single product
      .populate('user', 'name email'); // Only get name & email
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = { createOrder, getAllOrders };
