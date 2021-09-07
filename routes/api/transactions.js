/* eslint-disable no-console */
const express = require('express')
const router = express.Router()
const { v4: uuid } = require('uuid')

// Load Transactions model
const Wallet = require('../../models/Wallet')
const Transaction = require('../../models/Transaction')

// @route GET api/setup/test
// @desc Tests setup route
// @access Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Setup works',
  }))

// @route POST api/setup
// @desc Create wallet
// @access Public
router.post('/', async (req, res) => {
  const { balance = 0, name } = req.body
  const walletId = uuid()

  // Add to transactions
  try {
    const { _id: transactionId } = await new Transaction({
      walletId,
      amount: balance,
      description: 'Initial',
      type: 'CREDIT',
    }).save()

    // Create new wallet
    const { _id: id } = await new Wallet({
      _id: walletId,
      name,
      balance,
    }).save()
    return res.status(200).json({ wallet: {
      id,
      name,
      transactionId,
      balance,
    } })
  } catch (error) {
    return res.status(400).json({ error })
  }
})

module.exports = router
