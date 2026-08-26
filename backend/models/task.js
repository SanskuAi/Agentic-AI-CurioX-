const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Assigned",
        "In Progress",
        "Completed",
        "Resolved",
        "Recheck Required",
      ],
      default: "Assigned",
    },

    completionMessage: {
      type: String,
      default: "",
    },

    afterImage: {
      type: String,
      default: "",
    },

    verificationResult: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);