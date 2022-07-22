require ('dotenv').config()
const express  = require ('express')
const app = express()
const port = 3001
const bodyParser = require ('body-parser')
const router = require ('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use ('/api/v1', router)

app.listen (port, ()=> {
    console.log(`Daily News Backend listening on port ${port}`)
})