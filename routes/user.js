const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require('./verifyToken.js')
const {
  modifyUser,
  deleteUser,
  getUser,
  getUsers,
  getStats,
} = require('../controller/user.js')
const router = require('express').Router()

//edit user
router.put('/:id', verifyTokenAndAuthorization, modifyUser)

// delete user
router.delete('/:id', verifyTokenAndAuthorization, deleteUser)

// get user
router.get('/find/:id', verifyTokenAndAdmin, getUser)

//get all users
router.get('/', verifyTokenAndAdmin, getUsers)

// get user stars
router.get('/stats', verifyTokenAndAdmin, getStats)

module.exports = router
