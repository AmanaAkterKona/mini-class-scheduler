const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/slots', require('./routes/slots'))

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'ClassSync API running ✓' })
})

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✓ MongoDB connected')
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('✗ MongoDB connection failed:', err.message)
  })