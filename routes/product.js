const {
  createProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
} = require('../controller/product.js')
const { verifyTokenAndAdmin } = require('./verifyToken.js')

const router = require('express').Router()

//Create product
router.post('/new', verifyTokenAndAdmin, createProduct)

//Update product
router.post('/update/:id', verifyTokenAndAdmin, updateProduct)

// delete product
router.delete('/delete/:id', verifyTokenAndAdmin, deleteProduct)

// get a product
router.get('/find/:id', getProduct)

// get all products
router.get('/', getAllProducts)

module.exports = router
