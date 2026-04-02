const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const { analyzeResume } = require("../controllers/resume.controller");
const apiLimiter = require("../middlewares/rateLimiter.middleware");

// POST /api/v1/resume/analyze
router.post("/analyze", apiLimiter, upload.single("resume"), analyzeResume);

module.exports = router;
