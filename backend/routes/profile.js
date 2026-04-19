const express = require("express");
const router = express.Router();
const profile = require("../data/profile");

// GET /api/profile
router.get("/", (req, res) => {
  res.json({ success: true, data: profile });
});

// GET /api/profile/education
router.get("/education", (req, res) => {
  res.json({ success: true, data: profile.education });
});

// GET /api/profile/achievements
router.get("/achievements", (req, res) => {
  res.json({ success: true, data: profile.achievements });
});

// GET /api/profile/experience
router.get("/experience", (req, res) => {
  res.json({ success: true, data: profile.experience });
});

module.exports = router;
