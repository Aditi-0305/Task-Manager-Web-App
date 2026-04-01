require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');

async function test() {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  try {
    await User.create({ name: 'Test', email: 'test@test.com', password: 'password123' });
    console.log('Created successfully');
  } catch (error) {
    fs.writeFileSync('error_dump.txt', String(error) + '\n' + error.stack);
  }
  process.exit(0);
}

test();
