const express = require('express')
const router = express.Router()
const { v4: uuid } = require('uuid')

// Load Transactions model
const Wallet = require('../../models/Wallet')
const Transaction = require('../../models/Transaction')

// @route GET /api/test
// @desc Test route
// @access Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'API is working',
  }))

// @route POST api/setup
// @desc Create wallet
// @access Public
router.post('/setup', async (req, res) => {
  let { balance = 0, name } = req.body
  const walletId = uuid()

  try {
    balance = parseFloat(balance).toFixed(4)
    // Add to transactions
    const { _id: transactionId } = await new Transaction({
      walletId,
      amount: balance,
      balance,
      description: 'Initial',
      type: 'CREDIT',
    }).save()

    // Create new wallet
    const { _id: id, date } = await new Wallet({
      _id: walletId,
      name,
      balance,
    }).save()

    return res.status(200).json({
      id,
      name,
      transactionId,
      balance,
      date,
    })
  } catch (error) {
    return res.status(400).json({ error })
  }
})

// @route GET /api/wallet/:id
// @desc Wallet details
// @access Public
router.get('/wallet/:id', async (req, res) => {
  const { id } = req.params
  // Wallet id must be provided
  if (!id) {
    return res.status(400).json({ error: 'Wallet id must be provided' })
  }
  try {
    // Find wallet
    const wallet = await Wallet.findOne({ _id: id })
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' })
    }

    return res.status(200).json(wallet)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

// @route POST api/transact/:walletId
// @desc Create a transaction
// @access Public
router.post('/transact/:walletId', async (req, res) => {
  const { walletId } = req.params
  // Wallet id must be provided
  if (!walletId) {
    return res.status(400).json({ error: 'Wallet id must be provided' })
  }

  try {
    // Find wallet
    const wallet = await Wallet.findOne({ _id: walletId })
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' })
    }

    let { amount, description } = req.body
    // Check if amount is valid
    if (Number.isNaN(amount) || amount === undefined) {
      return res.status(400).json({ error: 'Please specify amount in number' })
    }
    if (amount === 0) {
      return res.status(400).json({ error: 'Why would you make an empty transaction?' })
    }
    // Determine type of transaction
    let type
    if (Math.sign(amount) === 1) {
      type = 'CREDIT'
    }
    if (Math.sign(amount) === -1) {
      type = 'DEBIT'
    }
    amount = Math.abs(parseFloat(amount).toFixed(4))

    // Execute transaction
    if (type === 'DEBIT' && wallet.balance < amount) {
      return res.status(400).json({ error: 'Wallet doesn\'t have enough funds' })
    }
    let balance = type === 'DEBIT' ? wallet.balance - amount : wallet.balance + amount
    balance = parseFloat(balance).toFixed(4)
    const transaction = await new Transaction({
      walletId,
      type,
      amount,
      balance,
      description,
    }).save()

    // Update Wallet
    await wallet.updateOne({ balance })

    return res.status(200).json({
      balance: transaction.balance,
      transactionId: transaction._id,
    })
  } catch (error) {
    return res.status(400).json({ error })
  }
})

// @route GET /api/transactions
// @desc All transactions in wallet
// @access Public
router.get('/transactions', async (req, res) => {
  const { walletId, skip, limit } = req.query

  // Wallet id must be provided
  if (!walletId) {
    return res.status(400).json({ error: 'Wallet id must be provided' })
  }

  try {
    // Find wallet
    const wallet = await Wallet.findOne({ _id: walletId })
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' })
    }

    // Find all transactions
    const transactions = await Transaction.find({ walletId }).skip(skip).limit(limit)

    return res.status(200).json(transactions)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

module.exports = router
