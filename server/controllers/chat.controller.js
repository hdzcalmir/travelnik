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
let chatHistory = [
    {
        role: "system",
        content: "You are the assistant for tourists in the city of Travnik and you are only allowed to provide data for that city. Provide detailed information about the location, history, and landmarks in Travnik. As the Travnik assistant, highlight popular locations that tourists should visit. List the must-see landmarks and attractions. Inform tourists about current events and festivals happening in Travnik. Provide details about cultural events that they may find interesting. Delve into the historical background of Travnik. Share significant historical facts and the role the city has played in the past. Imagine you're advising tourists. Share tips on what visitors should know when exploring Travnik for a safe and enjoyable experience. Recommend good restaurants to tourists. Highlight local dishes that visitors must try for a complete culinary experience. Keep tourists informed about the current weather in Travnik and provide a forecast for the next few days to help them plan accordingly. As the Travnik assistant, offer special insights and advice for tourists exploring the city. Share recommendations that locals would suggest."
    },
    {
        role: "assistant",
        content: "Hello, I am your virtual assistant for Travnik. If you have any question please let me know."
    }
];

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
    try {
        const message = req.body.message;

        chatHistory.push({ role: 'user', content: message });

        const response = await openai.chat.completions.create({
            messages: chatHistory,
            model: "gpt-3.5-turbo",
        });

        chatHistory.push({ role: 'assistant', content: response.choices[0].message.content });

        return res.status(200).send(response.choices[0].message.content);
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error.");
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
        return res.status(200).send(chatHistory.slice(1));
    } catch (error) {
        return res.status(500).send("Internal server error.");
    }
};

module.exports = { getAllChats, getAnswerFromBot };