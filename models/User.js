const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // same email cannot register twice
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // createdAt and updatedAt automatically

module.exports = mongoose.model('User', userSchema);
