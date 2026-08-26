const mongoose  = require("mongoose")
const { type } = require("node:os")

const userSchema = new mongoose.Schema({
    name:{
        type : String ,
        require: true,
        trim: true
    } ,
    email:{
        type: String,
        require:true,
        unique: true,
        lowercase:true ,
        trim:true
    },
    password:{
        type:String,
        require: true
    } ,
    role :{
        type:String,
        enum:["user", "department"] ,
        default: "user"
    }
} , {timestamps: true}) ;

module.exports = mongoose.model("user", userSchema)