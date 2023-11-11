const Location = require("../models/Location");
const db = require("../database/database.js");
const { INTEREST_CATEGORIES } = require("../utils/constants.js");

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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: The unique identifier for the business.
 *                   name:
 *                     type: string
 *                     description: The name of the business.
 *                   category:
 *                    type: string
 *                    description: The category of the business.
 *                   latitude:
 *                     type: number
 *                     description: The latitude coordinate of the business location.
 *                   longitude:
 *                     type: number
 *                     description: The longitude coordinate of the business location.
 *                   address:
 *                     type: string
 *                     description: Street address of the business.
 *                   city:
 *                     type: string
 *                     description: City of the business.
 *                   country:
 *                     type: string
 *                     description: Country of the business.
 *                   postal_code:
 *                     type: string
 *                     description: Postal code of city where business is.
 *                   description:
 *                     type: string
 *                     description: A description of the business.
 *                   opening_time:
 *                     type: string
 *                     description: The opening time of the business.
 *                   closing_time:
 *                     type: string
 *                     description: The closing time of the business.
 *       '500':
 *         description: Internal server error.
 *       '400':
 *         description: Bad request.
 */

const getAllBusinesses = (req, res) => {
  try {
    let getAllBusinessesQuery = 'SELECT * FROM businesses INNER JOIN location ON businesses.location_id = location.id';
    if (req.query.interests && req.query.check_in && req.query.check_out && req.query.people) {
      const jsonInterests = atob(req.query.interests);
      const interests = JSON.parse(jsonInterests);

      const selectedCategories = interests.reduce((acc, interest) => {
        return acc.concat(INTEREST_CATEGORIES[interest] || []);
      }, []);

      getAllBusinessesQuery = `SELECT * 
                              FROM businesses 
                              INNER JOIN location ON businesses.location_id = location.id 
                              WHERE category IN (${selectedCategories.join(',')})`;

    }
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
 *               address:
 *                 type: string
 *                 description: Street address of the business.
 *               city:
 *                 type: string
 *                 description: City of the business.
 *               country:
 *                 type: string
 *                 description: Country of the business.
 *               postalCode:
 *                 type: string
 *                 description: Postal code of city where business is.
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
          location.address = req.body.address;
          location.city = req.body.city;
          location.country = req.body.country;
          location.postalCode = req.body.postalCode;
          const insertNewLocationQuery =
            "INSERT INTO location (latitude, longitude, address, city, country, postal_code) VALUES(?, ?, ?, ?, ?, ?)";
          db.query(
            insertNewLocationQuery,
            [location.latitude, location.longitude, location.address, location.city, location.country, location.postalCode],
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
              } else {
                console.log(err)

                return res.status(500).send("Internal server error.");
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error)
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
 *               address:
 *                 type: string
 *                 description: Street address of the business.
 *               city:
 *                 type: string
 *                 description: City of the business.
 *               country:
 *                 type: string
 *                 description: Country of the business.
 *               postalCode:
 *                 type: string
 *                 description: Postal code of city where business is.
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
                  "UPDATE location SET latitude = ?, longitude = ?, address = ?, city = ?, country = ?, postal_code = ? WHERE id = ?";
                db.query(editBusinessLocationQuery, [
                  req.body.latitude,
                  req.body.longitude,
                  req.body.address,
                  req.body.city,
                  req.body.country,
                  req.body.postal_code,
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
