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

const express = require("express");

const multer = require("multer");

const Task = require("../models/Task");

const Report = require("../models/Report");

const {
    verifyResolution
} = require("../agent/verify");


const router = express.Router();


// MULTER

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        const name =
            Date.now() + "-" +
            file.originalname;

        cb(null, name);

    }

});

const upload = multer({
    storage: storage
});


// GET TASKS

router.get("/", async (req, res) => {

    try {

        const tasks =
            await Task.find()
                .populate("report");

        res.json(tasks);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to load tasks"
        });

    }

});


// GET SINGLE TASK

router.get("/:id", async (req, res) => {

    try {

        const task =
            await Task.findById(
                req.params.id
            ).populate("report");

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        res.json(task);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to load task"
        });

    }

});


// COMPLETE TASK + AI

router.put(
    "/:id/complete",

    upload.single("afterImage"),

    async (req, res) => {

        try {

            const task =
                await Task.findById(
                    req.params.id
                ).populate("report");


            if (!task) {

                return res.status(404).json({
                    message: "Task not found"
                });

            }


            if (!task.report) {

                return res.status(400).json({
                    message: "Report not found"
                });

            }


            if (!req.file) {

                return res.status(400).json({
                    message: "After image is required"
                });

            }


            const beforeImage =
                `uploads/${task.report.image}`;

            const afterImage =
                req.file.path;


            // AI

            const aiResult =
                await verifyResolution(
                    beforeImage,
                    afterImage,
                    task.report.problem
                );


            // SAVE TASK

            task.status =
                aiResult.result;

            task.completionMessage =
                req.body.completionMessage || "";

            task.afterImage =
                req.file.filename;

            task.verificationResult =
                aiResult.reason;

            await task.save();


            // SAVE REPORT

            task.report.status =
                aiResult.result;

            await task.report.save();


            res.json({

                message:
                    "AI verification complete",

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