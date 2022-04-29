const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/user.routes')

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
app.use('/public',express.static(__dirname+'public'))
app.use('/api',router)
app.use((req,res,next)=>{
    setImmediate(()=>{
        next(new Error('Something went wrong'))
    })
})
app.use(function(err,req,res,next){
    console.error(err.message)
    if(!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).json({message:err.message})
})

mongoose
    .connect('mongodb://127.0.0.1/mydatabase')
    .then((x)=>{
        console.log(`Connected to Mongodb: ${x.connections[0].name}`)
    })
    .then(()=>{
        app.listen(5000,()=>{
            console.log('Server running at http://localhost:5000')
        })
    })
    .catch((err)=>{
        console.error('Error connecting to mongo',err.reason)
    })