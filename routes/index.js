const express = require('express')
const app  = express()
const articleRoute = require('./articleRoute')
const categoriesRoute = require('./categoriesRoute')
// const scheduleRoute = require('./scheduleRoute')
// const locationRoute = require('./locationRoute')
// const cinemaRoute = require('./cinemaRoute')
// const bookingRoute = require('./bookingRoute')
// const authRoute = require('./authRoute')




app.use('/articles', articleRoute)
app.use('/categories', categoriesRoute)
// app.use('/schedule', scheduleRoute)
// app.use('/location', locationRoute)
// app.use('/cinema', cinemaRoute)
// app.use('/booking', bookingRoute)
// app.use('/auth', authRoute)



module.exports = app