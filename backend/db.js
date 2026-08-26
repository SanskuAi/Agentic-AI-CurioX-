const mongoose = require('mongoose')

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI )
        console.log('MogoDB connected');
        
    } catch (error) {
        console.error("MogoDB error", error.message) ;
        process.exit(1)  // program stop because on error
    }
}

module.exports = connectDB 