const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

// Load .env variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', userRoutes);

// health check route for testing
app.get('/', (req, res) => {
  res.send('Authentication API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});