const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/auth');
const { uploadImage } = require('../middleware/cloudinaryUpload');

const router = express.Router();

router.get('/', getProducts);
router.post('/', auth, uploadImage.single('image'), createProduct);
router.put('/:id', auth, uploadImage.single('image'), updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;