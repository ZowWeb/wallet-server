const rateLimit = require('express-rate-limit')

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 mins in milliseconds
  max: 4,
  message: { error429: 'Sorry, you can make only 4 requests every 5 minutes!' },
  headers: true,
})

module.exports = rateLimiter
