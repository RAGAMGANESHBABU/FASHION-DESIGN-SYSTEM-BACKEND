const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  try {
    const { user, products, isCart } = req.body;

    if (!user || !products || products.length === 0) {
      return res.status(400).json({ error: "User and products are required" });
    }

    // Convert products to array of { product: id, quantity: 1 } if only IDs provided
    const formattedProducts = products.map(p => {
      if (typeof p === 'string') return { product: p, quantity: 1 };
      return p;
    });

    const newOrder = new Order({
      user,
      products: formattedProducts,
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
      .populate({
        path: 'products.product',
        model: 'Product'
      })
      .populate('user', 'name email'); // Only get name & email
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = { createOrder, getAllOrders };
