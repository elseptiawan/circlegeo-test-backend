const mongoose = require('mongoose');
const connectDB = require('./db');
const User = require('../models/User');
const bcrypt = require("bcryptjs");

const seedUsers = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('password123', 8),
    role: 'admin',
    isVerified: true
  },
];

const seedDB = async () => {
  await connectDB();
  await User.deleteMany({});
  await User.insertMany(seedUsers);
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB();
