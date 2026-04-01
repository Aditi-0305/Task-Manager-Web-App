const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // allows us to parse incoming JSON

const { MongoMemoryServer } = require('mongodb-memory-server');

// Database Connection
const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;
    
    // If local DB is indicated and MongoDB isn't manually running, fallback to memory server
    if (mongoUri.includes('127.0.0.1') || mongoUri.includes('localhost')) {
      console.log('Starting local in-memory MongoDB instance for seamless development...');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Smart Task Manager API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
