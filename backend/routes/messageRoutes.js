const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Fetch chat history and populate the sender's username
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().populate('sender', 'username').sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

module.exports = router;
