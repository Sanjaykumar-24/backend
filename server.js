const express = require('express')
const server = express()
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const Route = require('./routes/controller.js')
const port = process.env.PORT || 3000
server.use(express.json())
server.use(express.urlencoded({ extended: false }));
server.use(cors({ origin: "*" }));
server.use('/',Route)
mongoose.connect(process.env.URI).then(()=>{
    console.log("Database connected successfully!")
}).catch((error)=>{
    console.log("Database connection error!")
})
server.listen(port,()=>{
    console.log('Server started at',port)
})