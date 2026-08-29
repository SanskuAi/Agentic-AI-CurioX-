// router.put(
//   "/:id/complete",
//   upload.single("afterImage"),

//   async (req, res) => {

//       try {

//           console.log(
//               "Completing task:",
//               req.params.id
//           );


//           // FIND TASK

//           const task =
//               await Task.findById(
//                   req.params.id
//               ).populate("report");


//           if (!task) {

//               return res.status(404).json({

//                   message:
//                       "Task not found"

//               });

//           }


//           // CHECK REPORT

//           if (!task.report) {

//               return res.status(400).json({

//                   message:
//                       "Report not found for this task"

//               });

//           }


//           // CHECK AFTER IMAGE

//           if (!req.file) {

//               return res.status(400).json({

//                   message:
//                       "After image is required"

//               });

//           }


//           // BEFORE IMAGE

//           const beforeImage =
//               `uploads/${task.report.image}`;


//           // AFTER IMAGE

//           const afterImage =
//               req.file.path;


//           console.log(
//               "Before:",
//               beforeImage
//           );

//           console.log(
//               "After:",
//               afterImage
//           );


//           // AI VERIFICATION

//           const aiResult =
//               await verifyResolution(

//                   beforeImage,

//                   afterImage,

//                   task.report.problem

//               );


//           console.log(
//               "AI RESULT:",
//               aiResult
//           );


//           // SAVE TASK

//           task.status =
//               aiResult.result;


//           task.completionMessage =
//               req.body.completionMessage || "";


//           task.afterImage =
//               req.file.filename;


//           task.verificationResult =
//               aiResult.reason;


//           await task.save();


//           // SAVE REPORT

//           task.report.status =
//               aiResult.result;


//           await task.report.save();


//           // SEND RESULT TO FRONTEND

//           return res.json({

//               message:
//                   "AI verification complete",

//               verification: {

//                   result:
//                       aiResult.result,

//                   reason:
//                       aiResult.reason

//               }

//           });


//       } catch (error) {

//           console.error(
//               "Verification Error:",
//               error
//           );


//           return res.status(500).json({

//               message:
//                   "AI verification failed",

//               error:
//                   error.message

//           });

//       }

//   }
// );







//****************** */

// const express = require("express");

// const multer = require("multer");

// const Task = require("../models/task");

// const Report = require("../models/Report");

// const {
//     verifyResolution
// } = require("../agent/verify");


// const router = express.Router();


// // MULTER

// const storage = multer.diskStorage({

//     destination: (req, file, cb) => {

//         cb(null, "uploads/");

//     },

//     filename: (req, file, cb) => {

//         const name =
//             Date.now() + "-" +
//             file.originalname;

//         cb(null, name);

//     }

// });

// const upload = multer({
//     storage: storage
// });


// // GET TASKS

// router.get("/", async (req, res) => {

//     try {

//         const tasks =
//             await Task.find()
//                 .populate("report");

//         res.json(tasks);

//     } catch (error) {

//         console.error(error);

//         res.status(500).json({
//             message: "Failed to load tasks"
//         });

//     }

// });


// // GET SINGLE TASK

// router.get("/:id", async (req, res) => {

//     try {

//         const task =
//             await Task.findById(
//                 req.params.id
//             ).populate("report");

//         if (!task) {

//             return res.status(404).json({
//                 message: "Task not found"
//             });

//         }

//         res.json(task);

//     } catch (error) {

//         console.error(error);

//         res.status(500).json({
//             message: "Failed to load task"
//         });

//     }

// });


// // COMPLETE TASK + AI

// router.put(
//     "/:id/complete",

//     upload.single("afterImage"),

//     async (req, res) => {

//         try {

//             const task =
//                 await Task.findById(
//                     req.params.id
//                 ).populate("report");


//             if (!task) {

//                 return res.status(404).json({
//                     message: "Task not found"
//                 });

//             }


//             if (!task.report) {

//                 return res.status(400).json({
//                     message: "Report not found"
//                 });

//             }


//             if (!req.file) {

//                 return res.status(400).json({
//                     message: "After image is required"
//                 });

//             }


//             const beforeImage =
//                 `uploads/${task.report.image}`;

//             const afterImage =
//                 req.file.path;


//             // AI

//             const aiResult =
//                 await verifyResolution(
//                     beforeImage,
//                     afterImage,
//                     task.report.problem
//                 );


//             // SAVE TASK

//             task.status =
//                 aiResult.result;

//             task.completionMessage =
//                 req.body.completionMessage || "";

//             task.afterImage =
//                 req.file.filename;

//             task.verificationResult =
//                 aiResult.reason;

//             await task.save();


//             // SAVE REPORT

//             task.report.status =
//                 aiResult.result;

//             await task.report.save();


//             res.json({

//                 message:
//                     "AI verification complete",

//                 verification:
//                     aiResult

//             });


//         } catch (error) {

//             console.error(
//                 "Verification Error:",
//                 error
//             );

//             res.status(500).json({

//                 message:
//                     "AI verification failed",

//                 error:
//                     error.message

//             });

//         }

//     }
// );


// module.exports = router;


const express = require("express");
const multer = require("multer");
const path = require("path");

const Task = require("../models/task");
const Report = require("../models/Report");

const {
    verifyResolution
} = require("../agent/verify");

const router = express.Router();

// ==================== MULTER ====================

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

// ==================== GET ALL TASKS ====================

router.get("/", async (req, res) => {

    try {

        const tasks =
            await Task.find()
                .populate("report")
                .sort({
                    createdAt: -1
                });

        res.json(tasks);

    } catch (error) {

        console.error(
            "GET TASKS ERROR:",
            error
        );

        res.status(500).json({

            message:
                "Failed to load tasks"
        });
    }
});

// ==================== GET SINGLE TASK ====================

router.get("/:id", async (req, res) => {

    try {

        const task =
            await Task.findById(
                req.params.id
            )
            .populate("report");

        if (!task) {

            return res.status(404).json({

                message:
                    "Task not found"
            });
        }

        res.json(task);

    } catch (error) {

        console.error(
            "GET SINGLE TASK ERROR:",
            error
        );

        res.status(500).json({

            message:
                "Failed to load task"
        });
    }
});

// ==================== COMPLETE TASK ====================

router.put(
    "/:id/complete",
    upload.single("afterImage"),
    async (req, res) => {

        try {

            console.log(
                "Completing task:",
                req.params.id
            );

            // ==================== FIND TASK ====================

            const task =
                await Task.findById(
                    req.params.id
                )
                .populate("report");

            if (!task) {

                return res.status(404).json({

                    message:
                        "Task not found"
                });
            }

            // ==================== CHECK REPORT ====================

            if (!task.report) {

                return res.status(400).json({

                    message:
                        "Report not found"
                });
            }

            // ==================== CHECK AFTER IMAGE ====================

            if (!req.file) {

                return res.status(400).json({

                    message:
                        "After image is required"
                });
            }

            // ==================== BEFORE IMAGE ====================

            if (!task.report.image) {

                return res.status(400).json({

                    message:
                        "Before image not found"
                });
            }

            const beforeImage =
                path.join(
                    __dirname,
                    "..",
                    "uploads",
                    task.report.image
                );

            const afterImage =
                req.file.path;

            console.log(
                "Before image:",
                beforeImage
            );

            console.log(
                "After image:",
                afterImage
            );

            // ==================== AI VERIFICATION ====================

            console.log(
                "Sending before/after images to AI..."
            );

            const aiResult =
                await verifyResolution(

                    beforeImage,

                    afterImage,

                    task.report.problem
                );

            console.log(
                "Verification Result:"
            );

            console.log(
                aiResult
            );

            // ==================== SAVE TASK ====================

            task.status =
                aiResult.result;

            task.completionMessage =
                req.body.completionMessage || "";

            task.afterImage =
                req.file.filename;

            task.verificationResult =
                aiResult.reason;

            await task.save();

            // ==================== SAVE REPORT ====================

            task.report.status =
                aiResult.result;

            await task.report.save();

            console.log(
                "Task updated successfully"
            );

            // ==================== RESPONSE ====================

            res.json({

                message:
                    "AI verification complete",

                task: task,

                verification:
                    aiResult
            });

        } catch (error) {

            console.error(
                "Verification Error:",
                error
            );

            res.status(500).json({

                message:
                    "AI verification failed",

                error:
                    error.message
            });
        }
    }
);

module.exports = router;