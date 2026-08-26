require("dotenv").config()  //load a dotenv file

const express = require('express')
const cors = require('cors')  //CONNECT FROT-BACK=END
const connectDB = require('./db')
const authRoutes = require('./router/auth')
const mongoose = require('mongoose')

// const mongoose = require('mongoose')
// const path = require('path')
const PORT = 5000;

const app = express()  

connectDB();

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)

app.get("/", (req,res)=>{
    res.json({
        message:"Agentic ai backend run"
    }) 
})

app.listen(PORT,()=>{
    console.log(`server run port-${PORT}`);
})