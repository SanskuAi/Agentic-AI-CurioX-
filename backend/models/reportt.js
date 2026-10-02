const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
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

        // AI Analysis
        category: {
            type: String,
            default: ""
        },

        severity: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        },

        department: {
            type: String,
            default: ""
        },

        // AI generated information
        aiSummary: {
            type: String,
            default: ""
        },

        resolutionRecommendation: {
            type: String,
            default: ""
        },

        aiReason: {
            type: String,
            default: ""
        },

        // Related / repeated complaints
        relatedComplaintCount: {
            type: Number,
            default: 1
        },

        // Complaint workflow
        status: {
            type: String,
            enum: [
                "Assigned",
                "In Progress",
                "Completed",
                "Resolved",
                "Needs Reinspection"
            ],
            default: "Assigned"
        },

        // AI verification after task completion
        verificationStatus: {
            type: String,
            enum: [
                "",
                "Likely Resolved",
                "Needs Reinspection"
            ],
            default: ""
        },

        verificationReason: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Report", reportSchema);