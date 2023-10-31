/**
 * @swagger
 * /api/activity:
 *   get:
 *     tags:
 *       - Activities
 *     summary: Get all activities
 *     description: Retrieve a list of all activities.
 *     responses:
 *       '200':
 *         description: Successful response with a list of activities.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       '500':
 *         description: Internal server error.
 */
export const getAllActivities = (req, res) => {
    try {
        const getAllActivitiesQuery = "SELECT * FROM activities";
        db.query(getAllActivitiesQuery, (err, data) => {
            return res.status(200).json(data);
        });
    } catch (error) {
        return res.status(500).send("Internal server error.");
    }
};