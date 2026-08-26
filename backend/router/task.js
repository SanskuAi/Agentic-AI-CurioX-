const express = require("express");
const multer = require("multer");

const Task = require("../models/Task");
const Report = require("../models/Report");

const { verifyResolution } =
    require("../agent/verify");

const router = express.Router();

// =========================
// MULTER STORAGE
// =========================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

// =========================
// MULTER UPLOAD
// =========================

const upload = multer({
  storage: storage,
});

// =========================
// COMPLETE TASK
// =========================

router.put(
  "/:id/complete",
  upload.single("afterImage"),
  async (req, res) => {
    try {
      const task = await Task.findById(req.params.id)
        .populate("report");

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "After image is required",
        });
      }

      const beforeImage = `uploads/${task.report.image}`;
      const afterImage = req.file.path;

      // AI VERIFICATION
      const aiResult = await verifyResolution(
        beforeImage,
        afterImage,
        task.report.problem
      );

      // SAVE RESULT
      task.status = aiResult.result;

      task.completionMessage =
        req.body.completionMessage;

      task.afterImage =
        req.file.filename;

      task.verificationResult =
        aiResult.reason;

      await task.save();

      task.report.status =
        aiResult.result;

      await task.report.save();

      res.json({
        message: "AI verification complete",
        verification: aiResult,
      });

    } catch (error) {
      console.error(
        "Verification Error:",
        error
      );

      res.status(500).json({
        message: "AI verification failed",
      });
    }
  }
);

module.exports = router;