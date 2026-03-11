const Bill = require('../models/Bill');
const Stock = require('../models/Stock');

exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBill = async (req, res) => {
  const { customerName, customerPhone, customerAddress, invoiceDate, items, discount = 0, tax = 0 } = req.body;
  try {
    let subtotal = 0;
    const processedItems = [];

    for (let item of items) {
      // Find stock by product reference or by productId
      let stock;
      if (item.productId) {
        stock = await Stock.findOne({ productId: item.productId });
      } else {
        stock = await Stock.findOne({ product: item.product });
      }

      if (!stock || stock.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${stock ? stock.productName : item.productName || 'product'}` });
      }
      stock.quantity -= item.quantity;
      await stock.save();
      
      const itemRate = Number(item.rate) || 0;
      subtotal += item.quantity * itemRate;

      processedItems.push({
        productId: stock.productId,
        productName: stock.productName,
        quantity: item.quantity,
        rate: itemRate
      });
    }

    const total = subtotal + Number(tax) - Number(discount);
    
    const bill = new Bill({
      customerName, 
      customerPhone,
      customerAddress,
      invoiceDate,
      items: processedItems, 
      discount: Number(discount), 
      tax: Number(tax), 
      total 
    });
    
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};