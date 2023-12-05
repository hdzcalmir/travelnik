const { getAllChats, getAnswerFromBot } = require('../controllers/chat.controller.js');
const express = require('express');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: OpenAI Chat-based interactions
 */

router.get("/", getAllChats);
router.post("/", getAnswerFromBot);

module.exports = router;
