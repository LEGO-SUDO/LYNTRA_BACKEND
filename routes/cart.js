const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCart,
} = require('../controller/cart.js')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken')

const router = require('express').Router()

//Create Cart
router.post('/new', verifyToken, createCart)

//Update Cart
router.post('/update/:id', verifyTokenAndAuthorization, updateCart)

// delete Cart
router.delete('/delete/:id', verifyTokenAndAuthorization, deleteCart)

// get a cart
router.get('/find/:userId', verifyTokenAndAuthorization, getCart)

// get all cart
router.get('/', verifyTokenAndAdmin, getAllCart)

module.exports = router
