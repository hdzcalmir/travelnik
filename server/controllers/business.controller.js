/**
 * @swagger
 * /api/business:
 *   get:
 *     tags:
 *       - Businesses
 *     summary: Get all businesses
 *     description: Retrieve a list of all businesses.
 *     responses:
 *       '200':
 *         description: Successful response with a list of businesses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Business'
 *       '500':
 *         description: Internal server error.
 */
const getAllBusinesses = (req, res) => {
    try {
        const getAllBusinessesQuery = "SELECT * FROM businesses";
        db.query(getAllBusinessesQuery, (err, data) => {
            return res.status(200).json(data);
        });
    } catch (error) {
        return res.status(500).send("Internal server error.");
    }
};

module.exports = { getAllBusinesses };