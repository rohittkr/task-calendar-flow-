const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// App setup
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); // Exit on connection failure
});

// Routes
const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

// Root endpoint (optional)
app.get('/', (req, res) => {
  res.send('🎉 API is up and running');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
});
