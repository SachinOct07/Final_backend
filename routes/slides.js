const express = require('express');
const { getSlides, createSlide, updateSlide, deleteSlide } = require('../controllers/slideController');
const auth = require('../middleware/auth');
const { uploadImage } = require('../middleware/cloudinaryUpload');

const router = express.Router();

router.get('/', getSlides);
router.post('/', auth, uploadImage.single('image'), createSlide);
router.put('/:id', auth, uploadImage.single('image'), updateSlide);
router.delete('/:id', auth, deleteSlide);

module.exports = router;