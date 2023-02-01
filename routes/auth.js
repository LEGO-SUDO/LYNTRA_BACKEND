const { addUser, loginUser } = require('../controller/auth.js')
const router = require('express').Router()

//create user
router.post('/signup', addUser)

//login
router.post('/signin', loginUser)

module.exports = router
