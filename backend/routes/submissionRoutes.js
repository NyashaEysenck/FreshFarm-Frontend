const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");
const analyzeMessage = require("../services/aiService");

// @route   POST /api/submissions
// @desc    Accept form submissions and analyze messages
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate request
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // AI Sentiment Analysis
    const aiResponse = await analyzeMessage(message);

    // Save submission with AI response
    const newSubmission = new Submission({ name, email, message, aiResponse });
    await newSubmission.save();

    res.status(201).json({ message: "Form submitted successfully!", data: newSubmission });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later." });
  }
});

// @route   GET /api/submissions
// @desc    Retrieve all submissions
// @access  Public
router.get("/", async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch submissions." });
  }
});

module.exports = router;

