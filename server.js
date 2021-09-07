/* eslint-disable no-console */
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const api = require('./routes/api')
const connectDB = require('./connectDB')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Use Routes
app.use('/api', api)

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, async () => {
  await connectDB()
  console.log(`🚀 Server running at ${PORT} in ${process.env.NODE_ENV} mode`)
})
