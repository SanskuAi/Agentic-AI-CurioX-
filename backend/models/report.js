const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    problem: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        default: ""
    },

    priority: {
        type: String,
        default: "Medium"
    },

    department: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        default: "Assigned"
    }

}, {
    timestamps: true
});


module.exports =
    mongoose.model("Report", reportSchema);