const User = require('../models/User.js')
const bcrypt = require('bcryptjs')

const modifyUser = async (req, res, next) => {
  if (req.body.password) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    req.body.password = hash
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('User has been deleted!')
  } catch (err) {
    res.status(500).json(err)
  }
}

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc
    res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getUsers = async (req, res, next) => {
  const query = req.query.new
  try {
    const user = query
      ? await User.find().sort({ id: -1 }).limit(5)
      : await User.find()

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getStats = async (req, res) => {
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: {
            $month: '$createdAt',
          },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ])
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  modifyUser,
  deleteUser,
  getUser,
  getUsers,
  getStats,
}
