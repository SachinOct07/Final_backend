const express = require('express');
const { getStocks, createStock, updateStock, getStockByProduct, deleteStock } = require('../controllers/stockController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getStocks);
router.post('/', auth, createStock);
router.put('/:id', auth, updateStock);
router.delete('/:id', auth, deleteStock);
router.get('/product/:productId', auth, getStockByProduct);

module.exports = router;