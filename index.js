const express = require('express')

const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
//const stripeRoute = require('./routes/stripe')
const cors = require('cors')

const connect = () => {
  mongoose
    .set('strictQuery', false)
    .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to DB')
    })
    .catch((err) => {
      throw err
    })
}

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)
//app.use('/api/checkout', stripeRoute)

app.listen(process.env.PORT || 8080, () => {
  connect()
  console.log(`App is listening`)
})
