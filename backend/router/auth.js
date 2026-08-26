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
                message:'All field reqired'
            })
        } ;

        // User already exixte
        const existinguser = await User.findOne({email})

        if(existinguser){
            return res.status(400).json({
                message:'email allready exitxe'
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
            message:"Register fail faile"
        })
    }
})



// LOGIN
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email"
            });
        }

        const passwordUser = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordUser) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Success
        res.json({
            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
}); 
module.exports = router