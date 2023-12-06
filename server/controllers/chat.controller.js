const openai = require("../utils/openai_api.js");

/**
 * @swagger
 * components:
 *   schemas:
 *     ChatMessage:
 *       type: object
 *       properties:
 *         role:
 *           type: string
 *           description: The role of the chat message (e.g., 'user', 'assistant', 'system').
 *         content:
 *           type: string
 *           description: The content of the chat message.
 *       example:
 *         role: "user"
 *         content: "Hello, I'm a tourist interested in Travnik. Can you recommend some landmarks?"
 */
const systemMessages = [
    {
        role: "system",
        content: "You are the assistant for tourists in the city of Travnik and you are only allowed to provide data for that city..."
    }
];

let assistantMessages = [
    {
        role: "assistant",
        content: "Hello, I am your virtual assistant for Travnik. If you have any question please let me know."
    }
];

let chatHistory = {};

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Get answer from the OpenAI bot
 *     description: |
 *       Send a message to the OpenAI GPT-3.5 Turbo model for a response.
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: User's message to the bot
 *             required:
 *               - message
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response from the OpenAI bot
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error.
 */

const getAnswerFromBot = async (req, res) => {
    if (!req.body.message) return res.status(400).send("Bad request");
    const userId = req.session.userId || generateUserId();
    const message = req.body.message;
    try {

        req.session.userId = userId;

        const userMessage = { role: 'user', content: message };

        chatHistory[userId] = chatHistory[userId] || [];
        chatHistory[userId].push(userMessage);

        const userMessages = [...systemMessages, ...assistantMessages, ...chatHistory[userId].slice(1)];

        const response = await openai.chat.completions.create({
            messages: userMessages,
            model: "gpt-3.5-turbo",
            max_tokens: 100,
        });

        chatHistory[userId].push({ role: 'assistant', content: response.choices[0].message.content });

        return res.status(200).send(response.choices[0].message.content);
    } catch (error) {
        const errorMessage = "We are sorry, but the assistant is currently unavailable. Please try again later.";
        chatHistory[userId].push({ role: 'assistant', content: errorMessage });

        return res.status(200).send(errorMessage);
    }
};

/**
 * @swagger
 * /api/chat:
 *   get:
 *     summary: Get all chat history 
 *     description: Retrieve the chat history
 *     tags: [Chat]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChatMessage'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error.
 */

const getAllChats = (req, res) => {
    try {
        const userId = req.session.userId || generateUserId();
        const userChatHistory = chatHistory[userId] || [];
        const allMessages = [...assistantMessages, ...userChatHistory];
        return res.status(200).send(allMessages);
    } catch (error) {
        return res.status(500).send("Internal server error.");
    }
};

function generateUserId() {
    return Math.random().toString(36).substring(2, 15);
}

module.exports = { getAllChats, getAnswerFromBot };