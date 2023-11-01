const Location = require("../models/Location");
const db = require("../database/database.js");

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

/**
 * @swagger
 * /api/business:
 *   post:
 *     tags:
 *       - Businesses
 *     summary: Create a new business
 *     description: Create a new business record in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the business.
 *               category:
 *                 type: string
 *                 description: The category of the business.
 *               latitude:
 *                 type: number
 *                 description: The latitude coordinate of the business location.
 *               longitude:
 *                 type: number
 *                 description: The longitude coordinate of the business location.
 *               description:
 *                 type: string
 *                 description: A description of the business.
 *               opening_time:
 *                 type: string
 *                 description: The opening time of the business.
 *               closing_time:
 *                 type: string
 *                 description: The closing time of the business.
 *     responses:
 *       '201':
 *         description: Business successfully created.
 *       '400':
 *         description: Bad request - Invalid input provided.
 *       '409':
 *         description: Conflict - Business already exists.
 *       '500':
 *         description: Internal server error.
 */
const createNewBusiness = (req, res) => {
  try {
    // >> Find if business with that data already exist
    const getBusinessQuery =
      "SELECT * FROM businesses WHERE name = ? AND category = ?";
    db.query(
      getBusinessQuery,
      [req.body.name, req.body.category],
      (err, data) => {
        if (data.length !== 0) {
          return res.status(409).send("That business already exist.");
        } else {
          let location = new Location();
          location.latitude = req.body.latitude;
          location.longitude = req.body.longitude;
          const insertNewLocationQuery =
            "INSERT INTO location (latitude, longitude) VALUES(?, ?)";
          db.query(
            insertNewLocationQuery,
            [location.latitude, location.longitude],
            (err, data) => {
              if (data) {
                // >> If business does not exist, create it
                const insertBusinessQuery =
                  "INSERT INTO businesses (name, category, description, opening_time, closing_time, location_id) VALUES(?, ?, ?, ?, ?, ?) ";
                db.query(insertBusinessQuery, [
                  req.body.name,
                  req.body.category,
                  req.body.description,
                  req.body.opening_time,
                  req.body.closing_time,
                  data.insertId,
                ]);
                return res.status(201).send("Business successfully created.");
              } else return res.status(500).send("Internal server error 1.");
            }
          );
        }
      }
    );
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

module.exports = { getAllBusinesses, createNewBusiness };
