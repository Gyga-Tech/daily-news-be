require ('dotenv').config()
const express  = require ('express')
const app = express()
const port = 3001
const bodyParser = require ('body-parser')
const router = require ('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use ('/api/v1', router)


// const bodyParser = require (body-parser)
// const router = require ('./routes')



app.listen (port, ()=> {
    console.log(`Daily New Backend listening on port${port}`)
})