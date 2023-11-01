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
 *       '400':
 *         description: Bad request.
 */
const getAllBusinesses = (req, res) => {
  try {
    const getAllBusinessesQuery =
      "SELECT * FROM businesses INNER JOIN location ON businesses.location_id = location.id";
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
    if (!req.body.name || !req.body.category)
      return res.status(400).send("Bad request.");

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
              } else return res.status(500).send("Internal server error.");
            }
          );
        }
      }
    );
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

/**
 * @swagger
 * /api/business/{id}:
 *   delete:
 *     tags:
 *       - Businesses
 *     summary: Delete a business
 *     description: Delete a business by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the business to delete.
 *     responses:
 *       '200':
 *         description: Business successfully deleted.
 *       '404':
 *         description: Business with that ID not found.
 *       '500':
 *         description: Internal server error.
 */
const deleteBusiness = (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send("Bad request.");
    // >> Check if business exist
    const checkIfBusinessExistQuery = "SELECT * FROM businesses WHERE id = ?";

    db.query(checkIfBusinessExistQuery, [req.params.id], (err, data) => {
      if (data.length !== 0) {
        const deleteBusinessQuery = "DELETE FROM businesses WHERE id = ?";

        db.query(deleteBusinessQuery, [req.params.id], (err, data) => {
          if (data) {
            return res.status(200).send("Business successfully deleted.");
          } else return res.status(404).send("That business does not exist.");
        });
      } else return res.status(404).send("That business does not exist.");
    });
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

/**
 * @swagger
 * /api/business/{id}:
 *   patch:
 *     tags:
 *       - Businesses
 *     summary: Edit a business
 *     description: Edit an existing business by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the business to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the business.
 *               category:
 *                 type: string
 *                 description: The new category of the business.
 *               description:
 *                 type: string
 *                 description: The new description of the business.
 *               opening_time:
 *                 type: string
 *                 description: The new opening time of the business.
 *               closing_time:
 *                 type: string
 *                 description: The new closing time of the business.
 *               latitude:
 *                 type: number
 *                 description: The new latitude coordinate of the business location.
 *               longitude:
 *                 type: number
 *                 description: The new longitude coordinate of the business location.
 *     responses:
 *       '200':
 *         description: Business successfully updated.
 *       '404':
 *         description: Business with that ID not found.
 *       '500':
 *         description: Internal server error.
 */
const editBusiness = (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send("Bad request.");
    // >> Check if business exist
    const checkIfBusinessExistQuery =
      "SELECT * FROM businesses INNER JOIN location ON businesses.location_id = location.id WHERE businesses.id = ? LIMIT 1";

    db.query(checkIfBusinessExistQuery, [req.params.id], (err, data) => {
      if (data.length !== 0) {
        const editBusinessQuery =
          "UPDATE businesses SET name = ?, category = ?, description = ?, opening_time = ?, closing_time = ? WHERE id = ?";

        db.query(
          editBusinessQuery,
          [
            req.body.name,
            req.body.category,
            req.body.description,
            req.body.opening_time,
            req.body.closing_time,
            req.params.id,
          ],
          (err, updateResult) => {
            if (err) {
              return res.status(500).send("Internal server error.");
            }

            // Check if any rows were affected by the update
            const getEditedBusinessQuery =
              "SELECT * FROM businesses INNER JOIN location ON businesses.location_id = location.id WHERE businesses.id = ? LIMIT 1";
            db.query(getEditedBusinessQuery, [req.params.id], (err, data) => {
              if (err) {
                return res.status(500).send("Internal server error.");
              }

              if (data.length > 0) {
                const editBusinessLocationQuery =
                  "UPDATE location SET latitude = ?, longitude = ? WHERE id = ?";
                db.query(editBusinessLocationQuery, [
                  req.body.latitude,
                  req.body.longitude,
                  data[0].location_id,
                ]);
                return res.status(200).json("Business successfully updated.");
              } else {
                return res.status(404).send("Business not found.");
              }
            });
          }
        );
      } else return res.status(404).send("That business does not exist.");
    });
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

module.exports = {
  getAllBusinesses,
  createNewBusiness,
  deleteBusiness,
  editBusiness,
};
