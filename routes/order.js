const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
  getStats,
} = require('../controller/order.js')
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} = require('./verifyToken.js')

const router = require('express').Router()

//Create order
router.post('/new', verifyToken, createOrder)

//Update order
router.post('/update/:id', verifyTokenAndAdmin, updateOrder)

// delete order
router.delete('/delete/:id', verifyTokenAndAdmin, deleteOrder)

// get a order
router.get('/find/:userId', verifyTokenAndAuthorization, getOrder)

// get all orders
router.get('/', verifyTokenAndAdmin, getAllOrder)

// income
router.get('/income', verifyTokenAndAdmin, getStats)

module.exports = router
