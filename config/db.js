const mongoose = require('mongoose');
const config = require('config');

const db = process.env.MONGO_URI || config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
