require ('dotenv').config()
const express  = require ('express')
const app = express()
const port = 3006
// const bodyParser = require (body-parser)
// const router = require ('./routes')



app.listen (port, ()=> {
    console.log(`Daily New Backend listening on port${port}`)
})