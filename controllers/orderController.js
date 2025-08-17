const Order = require('../models/Order');
const Product = require('../models/Product');

// Create order
const createOrder = async (req, res) => {
  try {
    const { user, product, isCart } = req.body;

    if (!user || !product) {
      return res.status(400).json({ error: "User and product are required" });
    }

    const newOrder = new Order({
      user,
      product,
      isCart
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("❌ Error creating order:", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('product') // populate single product
      .populate('user', 'name email'); // only name & email
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Delete order by ID
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order removed successfully" });
  } catch (err) {
    console.error("❌ Error deleting order:", err.message);
    res.status(500).json({ error: "Failed to delete order" });
  }
};

module.exports = { createOrder, getAllOrders, deleteOrder };
