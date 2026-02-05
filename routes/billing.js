const express = require('express');
const { getBills, createBill } = require('../controllers/billController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getBills);
router.post('/', auth, createBill);

module.exports = router;