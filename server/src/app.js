const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');
const app = express();

const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Sample Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Protected Route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Access granted' });
});

// User Routes (to be implemented)
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

app.use(errorHandler);

module.exports = app;
