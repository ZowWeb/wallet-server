const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const TransactionSchema = new Schema({
  wallet: {
    type: Schema.Types.ObjectId,
    ref: 'wallet',
  },
  walletId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: -999,
    max: 9999,
  },
  balance: Number,
  type: {
    type: String,
    enum: ['CREDIT', 'DEBIT'],
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Transaction = mongoose.model('transactions', TransactionSchema)

module.exports = Transaction
