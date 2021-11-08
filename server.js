/* eslint-disable no-console */
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const rateLimiter = require('./middlewares/rateLimiter')
const api = require('./routes/api')
const connectDB = require('./connectDB')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Middlewares

// Logger
app.use(morgan('dev'))

// CORS
const corsOptions = {
  credentials: true,
  origin: [
    /wallet.zohaib.in$/,
    /localhost/,
  ],
}
app.use(cors(corsOptions))

// Rate limiter
app.use(rateLimiter)

// Use Routes
if (process.env.NODE_ENV === 'development') {
  // Simulate delay while accessing db on local
  const addDelay = async next => {
    await setTimeout(() => next(), 2000)
  }
  app.use('/api', (req, res, next) => addDelay(next), api)
} else {
  app.use('/api', api)
}

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, async () => {
  await connectDB()
  console.log(`🚀 Server running at ${PORT} in ${process.env.NODE_ENV} mode`)
})
