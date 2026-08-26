const express = require('express')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')

const User = require("../models/user")

const router = express.Router()

// REGISTER
router.post("/register" , async(req , res)=>{
    try{
        const {name, email,password,role} = req.body
        if(!name || !email || !password) {
            return res.status(400).json({ 
                message:'All field reuired'
            })
        } ;

        // User already exixte
        const existinguser = await User.findOne({email})

        if(existinguser){
            return res.status(400).json({
                message:'eail already exite'
            })
        }

        // PASSWORD SECURUTY
        const hashpassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            email,
            password: hashpassword,
            role: role || "user"
        }) ;

        res.status(201).json({
            message:"Register sucessfull",
            user:{
                id: user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
        
    }  catch(error){
        res.status(500).json({
            message:"Regist faile"
        })
    }
})



// LOGIN
router.post("/login", async(req,res)=>{
    try{
        const {email , password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message: 'email and pass, req'
            })
        }


        const user = await User.findOne({email})

        if(!user ){
            return res.status(401).json({
                message:"Invalid email"
            })
        } 

        const passwordUser = await bcrypt.compare(
            password,
            user.password
        ) ;
        if(!passwordUser){
            return res.status(401).json({
                message:"Inavlide password"
            })
        };

        // ID {TOKen*_}
        const token = jwt.sign(
            {
            id:user._id,
            role:user.role
        },
    process.env.JWT_SECRET,
    { 
        expiresIn: 'id'  //TOKE CVALID ONE DAY
    } ) ;

    // SUCESS
    res.json({
        message: "login successfull" ,
        token ,
        user:{
            id:user._id,
            name:user.name,
            email: user.email,
            role: user.role
        }
    })
    }  
    catch(error) {
        res.status(500).json({
            message:"Logain failed"
        })
    }
})

module.exports = router