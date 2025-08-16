const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  products: [
    {
      product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      quantity: { 
        type: Number, 
        default: 1, 
        min: 1 
      }
    }
  ],
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
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Auto calculate totalAmount before saving
orderSchema.pre("save", async function (next) {
  if (this.products && this.products.length > 0) {
    const Product = mongoose.model("Product");
    let total = 0;

    for (const item of this.products) {
      const product = await Product.findById(item.product);
      if (product) {
        total += product.price * item.quantity;
      }
    }
    this.totalAmount = total;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
