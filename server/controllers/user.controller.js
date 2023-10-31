/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       '200':
 *         description: Successful response with a list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error.
 */
export const getAllUsers = (req, res) => {
    try {
        const getAllUsersQuery = "SELECT * FROM users";
        db.query(getAllUsersQuery, (err, data) => {
            return res.status(200).json(data);
        });
    } catch (error) {
        return res.status(500).send("Internal server error.");
    }
};