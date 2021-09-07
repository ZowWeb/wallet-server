const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).json({ success: 'Working...' })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running at ${PORT} in ${process.env.NODE_ENV} mode`)
})
