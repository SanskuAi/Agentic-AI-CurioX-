// const express = require('express')
// const bcrypt = require('bcrypt')
// const jwt  = require('jsonwebtoken')

// const User = require("../models/user")

// const router = express.Router()

// // REGISTER
// router.post("/register" , async(req , res)=>{
//     try{
//         const {name, email,password,role} = req.body
//         if(!name || !email || !password) {
//             return res.status(400).json({ 
//                 message:'All field reqired'
//             })
//         } ;

//         // User already exixte
//         const existinguser = await User.findOne({email})

//         if(existinguser){
//             return res.status(400).json({
//                 message:'email allready exitxe'
//             })
//         }

//         // PASSWORD SECURUTY
//         const hashpassword = await bcrypt.hash(password,10)
//         const user = await User.create({
//             name,
//             email,
//             password: hashpassword,
//             role: role || "user"
//         }) ;

//         res.status(201).json({
//             message:"Register sucessfull",
//             user:{
//                 id: user._id,
//                 name:user.name,
//                 email:user.email,
//                 role:user.role
//             }
//         })
        
//     }  catch(error){
//         res.status(500).json({
//             message:"Register fail faile"
//         })
//     }
// })



// // LOGIN
// router.post("/login", async (req, res) => {

//     try {

//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({
//                 message: "Email and password are required"
//             });
//         }

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(401).json({
//                 message: "Invalid email"
//             });
//         }

//         const passwordUser = await bcrypt.compare(
//             password,
//             user.password
//         );

//         if (!passwordUser) {
//             return res.status(401).json({
//                 message: "Invalid password"
//             });
//         }

//         // Create JWT token
//         const token = jwt.sign(
//             {
//                 id: user._id,
//                 role: user.role
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: "1d"
//             }
//         );

//         // Success
//         res.json({
//             message: "Login successful",

//             token,

//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role
//             }
//         });

//     } catch (error) {

//         console.error("LOGIN ERROR:", error);

//         res.status(500).json({
//             message: "Login failed",
//             error: error.message
//         });
//     }
// }); 
// module.exports = router

// const API = "http://localhost:5000/api/auth";

// // ==================== REGISTER ====================
// const registerForm =
//     document.getElementById("registerForm");

// if (registerForm) {

//     registerForm.addEventListener("submit", async (e) => {

//         e.preventDefault();

//         const name =
//             document.getElementById("name").value;

//         const email =
//             document.getElementById("email").value;

//         const password =
//             document.getElementById("password").value;

//         const role =
//             document.getElementById("role").value;

//         const message =
//             document.getElementById("message");

//         try {

//             const response = await fetch(
//                 `${API}/register`,
//                 {
//                     method: "POST",

//                     headers: {
//                         "Content-Type": "application/json"
//                     },

//                     body: JSON.stringify({
//                         name,
//                         email,
//                         password,
//                         role
//                     })
//                 }
//             );

//             const data =
//                 await response.json();

//             message.textContent =
//                 data.message || "";

//             if (response.ok) {

//                 message.className = "success";

//                 setTimeout(() => {
//                     window.location.href =
//                         "login.html";
//                 }, 500);

//             } else {

//                 message.className = "error";
//             }

//         } catch (error) {

//             console.error("REGISTER ERROR:", error);

//             message.textContent =
//                 "Server connection failed";
//         }
//     });
// }


// // ==================== LOGIN ====================
// const loginForm =
//     document.getElementById("loginForm");

// if (loginForm) {

//     loginForm.addEventListener("submit", async (e) => {

//         e.preventDefault();

//         const email =
//             document.getElementById("loginEmail").value;

//         const password =
//             document.getElementById("loginPassword").value;

//         const loginMessage =
//             document.getElementById("loginMessage");

//         try {

//             const response = await fetch(
//                 `${API}/login`,
//                 {
//                     method: "POST",

//                     headers: {
//                         "Content-Type": "application/json"
//                     },

//                     body: JSON.stringify({
//                         email,
//                         password
//                     })
//                 }
//             );

//             const data =
//                 await response.json();

//             if (!response.ok) {

//                 loginMessage.textContent =
//                     data.message || "Login failed";

//                 loginMessage.className = "error";

//                 return;
//             }

//             // ==================== SAVE LOGIN DATA ====================
//             localStorage.setItem(
//                 "token",
//                 data.token
//             );

//             localStorage.setItem(
//                 "user",
//                 JSON.stringify(data.user)
//             );

//             // ==================== ROLE REDIRECT ====================
//             if (data.user.role === "department") {

//                 window.location.href =
//                     "department.html";

//             } else if (data.user.role === "admin") {

//                 window.location.href =
//                     "admin.html";

//             } else {

//                 window.location.href =
//                     "dashboard.html";
//             }

//         } catch (error) {

//             console.error("LOGIN ERROR:", error);

//             loginMessage.textContent =
//                 "Server connection failed";

//             loginMessage.className = "error";
//         }
//     });
// }

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

// ==================== REGISTER ====================

router.post("/register", async (req, res) => {


try {

    const {
        name,
        email,
        password,
        role
    } = req.body;


    // VALIDATION

    if (!name || !email || !password) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }


    // CHECK EXISTING USER

    const existingUser =
        await User.findOne({
            email: email.toLowerCase()
        });

    if (existingUser) {

        return res.status(400).json({
            message: "Email already exists"
        });

    }


    // HASH PASSWORD

    const hashedPassword =
        await bcrypt.hash(password, 10);


    // CREATE USER

    const user =
        await User.create({

            name: name.trim(),

            email: email.toLowerCase().trim(),

            password: hashedPassword,

            role: role || "user"

        });


    // RESPONSE

    res.status(201).json({

        message: "Register successful",

        user: {

            _id: user._id,

            name: user.name,

            email: user.email,

            role: user.role

        }

    });


} catch (error) {

    console.error(
        "REGISTER ERROR:",
        error
    );

    res.status(500).json({

        message: "Registration failed",

        error: error.message

    });

}


});

// ==================== LOGIN ====================

router.post("/login", async (req, res) => {


try {

    const {
        email,
        password
    } = req.body;


    // VALIDATION

    if (!email || !password) {

        return res.status(400).json({

            message:
                "Email and password are required"

        });

    }


    // CHECK JWT SECRET

    if (!process.env.JWT_SECRET) {

        console.error(
            "JWT_SECRET is missing in .env"
        );

        return res.status(500).json({

            message:
                "JWT_SECRET is missing in backend .env"

        });

    }


    // FIND USER

    const user =
        await User.findOne({

            email:
                email.toLowerCase().trim()

        });


    if (!user) {

        return res.status(401).json({

            message:
                "Invalid email or password"

        });

    }


    // CHECK PASSWORD

    const passwordMatch =
        await bcrypt.compare(
            password,
            user.password
        );


    if (!passwordMatch) {

        return res.status(401).json({

            message:
                "Invalid email or password"

        });

    }


    // CREATE JWT TOKEN

    const token =
        jwt.sign(

            {
                id: user._id.toString(),

                role: user.role

            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );


    // SUCCESS

    res.status(200).json({

        message:
            "Login successful",

        token,

        user: {

            _id: user._id,

            name: user.name,

            email: user.email,

            role: user.role

        }

    });


} catch (error) {

    console.error(
        "LOGIN ERROR:",
        error
    );

    res.status(500).json({

        message:
            "Login failed",

        error:
            error.message

    });

}

});

module.exports = router;
