require ('dotenv').config()
const express  = require ('express')
const app = express()
const port = 3001
const bodyParser = require ('body-parser')
const router = require ('./routes')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use ('/api/v1', router)
app.get("/", (req,res) =>{
    res.send("api berjalan")
})

// const bodyParser = require (body-parser)
// const router = require ('./routes')


app.listen (process.env.PORT || port, ()=> {
    console.log(`Daily New Backend listening on port${port}`)
})