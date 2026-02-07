const express = require('express');
const { getSchemes, createScheme, updateScheme, deleteScheme } = require('../controllers/schemeController');
const auth = require('../middleware/auth');
const { uploadImage } = require('../middleware/cloudinaryUpload');

const router = express.Router();

router.get('/', getSchemes);
router.post('/', auth, uploadImage.single('image'), createScheme);
router.put('/:id', auth, uploadImage.single('image'), updateScheme);
router.delete('/:id', auth, deleteScheme);

module.exports = router;