// const express = require("express");
// const multer = require("multer");

// const Report = require("../models/Report");
// const { analyzeReport } = require("../agent/agent");

// require("../models/user");

// const router = express.Router();


// // IMAGE UPLOAD

// const storage = multer.diskStorage({

//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },

//     filename: (req, file, cb) => {

//         const name =
//             Date.now() + "-" + file.originalname;

//         cb(null, name);
//     }

// });

// const upload = multer({
//     storage: storage
// });

// router.get("/", async (req, res) => {

//     try {

//         const reports =
//             await Report.find()
//                 .populate("user")
//                 .sort({
//                     createdAt: -1
//                 });


//         res.json(reports);

//     } catch (error) {

//         console.error(error);

//         res.status(500).json({

//             message:
//                 "Failed to fetch reports"

//         });

//     }

// });



// // CREATE REPORT

// router.post(
//     "/",
//     upload.single("image"),
//     async (req, res) => {

//         try {

//             const {
//                 userId,
//                 problem,
//                 location
//             } = req.body;


//             // VALIDATION

//             if (!userId || !problem || !location) {

//                 return res.status(400).json({
//                     message:
//                         "Problem and location are required"
//                 });

//             }


//             // AI ANALYSIS

//             const aiResult =
//                 await analyzeReport(
//                     problem,
//                     location
//                 );


//             console.log("AI Result:");
//             console.log(aiResult);


//             // CHECK SIMILAR REPORTS

//             const similarReports =
//                 await Report.find({

//                     location: {
//                         $regex: location,
//                         $options: "i"
//                     },

//                     problem: {
//                         $regex:
//                             problem.split(" ")[0],
//                         $options: "i"
//                     }

//                 });


//             // TERMINAL

//             console.log("New Report:");
//             console.log(
//                 "Problem:",
//                 problem
//             );

//             console.log(
//                 "Location:",
//                 location
//             );

//             console.log(
//                 "Similar Reports:",
//                 similarReports.length
//             );


//             // PRIORITY

//             let priority =
//                 aiResult.priority;


//             if (similarReports.length >= 2) {

//                 priority = "High";

//             }


//             console.log(
//                 "Final Priority:",
//                 priority
//             );


//             // SAVE REPORT

//             const report =
//                 await Report.create({

//                     user: userId,

//                     problem: problem,

//                     location: location,

//                     image: req.file
//                         ? req.file.filename
//                         : "",

//                     category:
//                         aiResult.category,

//                     priority:
//                         priority,

//                     department:
//                         aiResult.department,

//                     status:
//                         "Assigned"

//                 });


//             console.log(
//                 "Report saved:",
//                 report._id
//             );

//             const Task = require("../models/task");

// const task = await Task.create({
//     report: report._id,
//     department: report.department,
//     status: "Assigned",
// });


//             // RESPONSE

//             res.status(201).json({

//                 message:
//                     "AI analysis complete",

//                 report: report,

//                 ai: {

//                     category:
//                         aiResult.category,

//                     priority:
//                         priority,

//                     department:
//                         aiResult.department,

//                     similarReports:
//                         similarReports.length,

//                     reason:
//                         similarReports.length >= 2
//                             ? "Multiple reports found at this location."
//                             : aiResult.reason

//                 }

//             });

//         } catch (error) {

//             console.error(
//                 "AI Report Error:",
//                 error
//             );

//             res.status(500).json({

//                 message:
//                     "AI analysis failed"

//             });

//         }

//     }
// );


// module.exports = router;

const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");

const Report = require("../models/Report");
const Task = require("../models/task");

const { analyzeReport } = require("../agent/agent");

require("../models/user");

const router = express.Router();

// ==================== IMAGE UPLOAD ====================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const name =
            Date.now() + "-" + file.originalname;

        cb(null, name);
    }
});

const upload = multer({
    storage: storage
});

// ==================== GET ALL REPORTS ====================

router.get("/", async (req, res) => {
    try {
        const reports = await Report.find()
            .populate("user")
            .sort({
                createdAt: -1
            });

        res.json(reports);

    } catch (error) {

        console.error(
            "GET REPORTS ERROR:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch reports"
        });
    }
});

// ==================== CREATE REPORT ====================

router.post(
    "/",
    upload.single("image"),
    async (req, res) => {

        try {

            const {
                userId,
                problem,
                location
            } = req.body;

            // ==================== VALIDATION ====================

            if (!userId || !problem || !location) {

                return res.status(400).json({
                    message:
                        "User, problem and location are required"
                });
            }

            // ==================== CHECK USER ID ====================

            if (!mongoose.Types.ObjectId.isValid(userId)) {

                return res.status(400).json({
                    message: "Invalid user ID"
                });
            }

            console.log("Sending report to Gemini...");
            console.log("User ID:", userId);
            console.log("Problem:", problem);
            console.log("Location:", location);

            // ==================== AI ANALYSIS ====================

            const aiResult =
                await analyzeReport(
                    problem,
                    location
                );

            console.log("AI Result:");
            console.log(aiResult);

            // ==================== SIMILAR REPORTS ====================

            const similarReports =
                await Report.find({
                    location: {
                        $regex: location,
                        $options: "i"
                    },

                    problem: {
                        $regex: problem.split(" ")[0],
                        $options: "i"
                    }
                });

            console.log("New Report:");
            console.log(
                "Problem:",
                problem
            );

            console.log(
                "Location:",
                location
            );

            console.log(
                "Similar Reports:",
                similarReports.length
            );

            // ==================== PRIORITY ====================

            let priority =
                aiResult.priority;

            if (similarReports.length >= 2) {
                priority = "High";
            }

            console.log(
                "Final Priority:",
                priority
            );

            // ==================== SAVE REPORT ====================

            const report =
                await Report.create({

                    user: new mongoose.Types.ObjectId(userId),

                    problem: problem,

                    location: location,

                    image: req.file
                        ? req.file.filename
                        : "",

                    category:
                        aiResult.category,

                    priority:
                        priority,

                    department:
                        aiResult.department,

                    status:
                        "Assigned"
                });

            console.log(
                "Report saved:",
                report._id
            );

            // ==================== CREATE TASK ====================

            const task =
                await Task.create({

                    report: report._id,

                    department:
                        report.department,

                    status:
                        "Assigned"
                });

            console.log(
                "Task created:",
                task._id
            );

            // ==================== RESPONSE ====================

            res.status(201).json({

                message:
                    "AI analysis complete",

                report: report,

                task: task,

                ai: {

                    category:
                        aiResult.category,

                    priority:
                        priority,

                    department:
                        aiResult.department,

                    similarReports:
                        similarReports.length,

                    reason:
                        similarReports.length >= 2
                            ? "Multiple reports found at this location."
                            : aiResult.reason
                }
            });

        } catch (error) {

            console.error(
                "AI Report Error:",
                error
            );

            res.status(500).json({

                message:
                    "AI analysis failed",

                error:
                    error.message
            });
        }
    }
);

module.exports = router;