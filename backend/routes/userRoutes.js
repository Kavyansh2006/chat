const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Simple "login" or register route
router.post('/login', async (req, res) => {
  const { username } = req.body;
  try {
    // Find user, or create if they don't exist
    let user = await User.findOne({ username });
    if (!user) {
      user = await User.create({ username });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error creating user" });
  }
});

module.exports = router;
