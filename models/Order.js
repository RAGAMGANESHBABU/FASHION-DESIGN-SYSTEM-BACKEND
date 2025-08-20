const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  isCart: { 
    type: Boolean, 
    default: false 
  },
  totalAmount: { 
    type: Number, 
    default: 0 
  },
  status: {
    type: String,
    enum: ["Pending", "Placed", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },
  location: {
    type: String, 
    default="",
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Auto calculate totalAmount before saving
orderSchema.pre("save", async function (next) {
  try {
    const Product = mongoose.model("Product");
    const prod = await Product.findById(this.product);
    if (prod) {
      this.totalAmount = prod.price; // quantity removed, so single product price
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Order', orderSchema);
