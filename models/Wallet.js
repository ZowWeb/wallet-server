const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const WalletSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    min: 0,
    max: 9999,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Wallet = mongoose.model('wallet', WalletSchema)

module.exports = Wallet
