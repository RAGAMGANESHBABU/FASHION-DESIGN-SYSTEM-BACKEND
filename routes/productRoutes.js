const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getAllProducts,
  addProduct,
  deleteProduct
} = require('../controllers/productController');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// 🛠 Fix routes - remove redundant '/products'
router.get('/', getAllProducts);
router.post('/', upload.single('image'), addProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
