/**
 * @swagger
 * /api/events:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get all events
 *     description: Retrieve a list of all events.
 *     responses:
 *       '200':
 *         description: Successful response with a list of events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       '500':
 *         description: Internal server error.
 */
const getAllEvents = (req, res) => {
    try {
        const getAllEventsQuery = "SELECT * FROM events";
        db.query(getAllEventsQuery, (err, data) => {
            return res.status(200).json(data);
        });
    } catch (error) {
        return res.status(500).send("Internal server error.");
    }
};

module.exports = { getAllEvents };