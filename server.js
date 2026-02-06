const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://localhost:27017/sm-priya-electricals';
    if (!process.env.MONGO_URI) {
      console.warn('⚠️  WARNING: MONGO_URI environment variable is not defined.');
      console.warn('   Falling back to local database: mongodb://localhost:27017/sm-priya-electricals');
      console.warn('   This will FAIL on production servers like Render/Heroku/Vercel.');
    }

    await mongoose.connect(connStr);
    console.log('✅ MongoDB connected successfully');

    // Only create admin after connection is successful
    createDefaultAdmin();
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

connectDB();

// Create default admin
const Admin = require('./models/Admin');
const createDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new Admin({ username: 'admin', password: hashedPassword });
      await admin.save();
      console.log('Default admin created: username: admin, password: admin123');
    }
  } catch (err) {
    console.log('Error creating default admin:', err);
  }
};
createDefaultAdmin();

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/schemes', require('./routes/schemes'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/stock', require('./routes/stock'));
app.use('/api/billing', require('./routes/billing'));
app.use('/api/slides', require('./routes/slides'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));