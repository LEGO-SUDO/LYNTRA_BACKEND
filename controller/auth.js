const { createError } = require('../error.js')
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const addUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({ ...req.body, password: hash })
    await newUser.save()
    res.status(200).send(newUser)
  } catch (err) {
    next(err)
  }
}
const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name })
    if (!user) return next(createError(404, 'No user found'))
    const isCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isCorrect) return next(createError(404, 'Wrong password!'))

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT,
      { expiresIn: '1d' }
    )

    const { password, ...others } = user._doc
    res.status(200).json({ ...others, accessToken })
  } catch (err) {
    next(err)
  }
}
module.exports = { addUser, loginUser }
