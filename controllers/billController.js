const Bill = require('../models/Bill');
const Stock = require('../models/Stock');

exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate('items.product');
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBill = async (req, res) => {
  const { items, tax } = req.body;
  try {
    let total = 0;
    for (let item of items) {
      // Find stock by product reference or by productId
      let stock;
      if (item.productId) {
        stock = await Stock.findOne({ productId: item.productId });
      } else {
        stock = await Stock.findOne({ product: item.product });
      }

      if (!stock || stock.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${stock ? stock.productName : 'product'}` });
      }
      stock.quantity -= item.quantity;
      await stock.save();
      total += item.quantity * item.rate;
    }
    total += tax;
    const bill = new Bill({ items, tax, total });
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};