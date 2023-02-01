// const router = require('express').Router()
// const Stripe = require('stripe')

// const KEY = process.env.STRIPE_KEY
// const stripe = Stripe(KEY)
// router.post('/payment', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'T-shirt',
//           },
//           unit_amount: req.body.amount,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: 'http://localhost:3000/success',
//     cancel_url: 'http://localhost:8080/cancel',
//   })

//   res.redirect(303, session.url)
// })

// module.exports = router
