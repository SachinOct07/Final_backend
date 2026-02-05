const express = require('express');
const { getSlides, createSlide, updateSlide, deleteSlide } = require('../controllers/slideController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getSlides);
router.post('/', auth, upload.single('image'), createSlide);
router.put('/:id', auth, upload.single('image'), updateSlide);
router.delete('/:id', auth, deleteSlide);

module.exports = router;