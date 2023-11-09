const db = require("../database/database.js");

/**
 * @swagger
 * /api/location:
 *   get:
 *     summary: Get All Locations
 *     tags:
 *       - Locations
 *     description: Retrieve a list of all locations, including events, activities, and businesses.
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 businesses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Business'
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *                 activities:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Activity'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error.
 *     operationId: getAllLocations
 */

const getAllLocations = async (req, res) => {
  try {
    const getAllBusinessesQuery =
      "SELECT * FROM businesses INNER JOIN location ON businesses.location_id = location.id";
    const getAllEventsQuery =
      "SELECT * FROM events INNER JOIN location ON events.location_id = location.id";
    const getAllActivitiesQuery =
      "SELECT * FROM activities INNER JOIN location ON activities.location_id = location.id";

    const businesses = await new Promise((resolve, reject) => {
      db.query(getAllBusinessesQuery, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });

    const events = await new Promise((resolve, reject) => {
      db.query(getAllEventsQuery, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });

    const activities = await new Promise((resolve, reject) => {
      db.query(getAllActivitiesQuery, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });

    const responseData = {
      businesses,
      events,
      activities,
    };

    return res.status(200).send(responseData);
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

module.exports = {
  getAllLocations,
};

module.exports = {
  getAllLocations,
};
