const Location = require("../models/Location");
const db = require("../database/database.js");

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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: The unique identifier for the activity.
 *                   reviews:
 *                     type: array
 *                     description: The list of reviews with its properties.
 *                   location_id:
 *                     type: number
 *                     description: The unique identifier for the location associated with the activity.
 *                   name:
 *                     type: string
 *                     description: The name of the activity.
 *                   description:
 *                     type: string
 *                     description: A description of the activity.
 *                   category:
 *                     type: string
 *                     description: The category of the activity.
 *                   duration:
 *                     type: string
 *                     description: The duration of the activity.
 *                   difficulty:
 *                     type: string
 *                     description: The difficulty level of the activity.
 *                   latitude:
 *                     type: number
 *                     description: The new latitude coordinate of the activity location.
 *                   longitude:
 *                     type: number
 *                     description: The new longitude coordinate of the activity location.
 *                   address:
 *                     type: string
 *                     description: Street address of the activity.
 *                   city:
 *                     type: string
 *                     description: City of the activity.
 *                   country:
 *                     type: string
 *                     description: Country of the activity.
 *                   postal_code:
 *                     type: string
 *                     description: Postal code of city where activity is.
 *                   start_time:
 *                     type: string
 *                     description: The start time of the activity.
 *                   end_time:
 *                     type: string
 *                     description: The end time of the activity.
 *       '500':
 *         description: Internal server error.
 */
const getAllActivities = (req, res) => {
  try {
    const getAllActivitiesQuery = "SELECT * FROM activities";
    db.query(getAllActivitiesQuery, (err, data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

/**
 * @swagger
 * /api/activity:
 *   post:
 *     tags:
 *       - Activities
 *     summary: Create a new activity
 *     description: Create a new activity record in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the activity.
 *               category:
 *                 type: string
 *                 description: The category of the activity.
 *               description:
 *                 type: string
 *                 description: A description of the activity.
 *               duration:
 *                 type: string
 *                 description: The duration of the activity.
 *               difficulty:
 *                 type: string
 *                 description: The difficulty level of the activity.
 *               latitude:
 *                 type: number
 *                 description: The latitude coordinate of the activity location.
 *               longitude:
 *                 type: number
 *                 description: The longitude coordinate of the activity location.
 *               address:
 *                 type: string
 *                 description: Street address of the activity.
 *               city:
 *                 type: string
 *                 description: City of the activity.
 *               country:
 *                 type: string
 *                 description: Country of the activity.
 *               postalCode:
 *                 type: string
 *                 description: Postal code of city where activity is organized.
 *     responses:
 *       '201':
 *         description: Activity successfully created.
 *       '400':
 *         description: Bad request - Invalid input provided.
 *       '409':
 *         description: Conflict - Activity already exists.
 *       '500':
 *         description: Internal server error.
 */
const createNewActivity = (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.category ||
      !req.body.duration ||
      !req.body.difficulty
    )
      return res.status(400).send("Bad request.");

    // >> Find if activity with that data already exists
    const getActivityQuery =
      "SELECT * FROM activities WHERE name = ? AND category = ?";
    db.query(
      getActivityQuery,
      [req.body.name, req.body.category],
      (err, data) => {
        if (err) {
          return res.status(500).send("Internal server error.");
        }

        if (data.length !== 0) {
          return res.status(409).send("That activity already exists.");
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
              if (err) {
                return res.status(500).send("Internal server error.");
              }

              if (data) {
                const insertActivityQuery =
                  "INSERT INTO activities (name, category, description, duration, difficulty, location_id) VALUES(?, ?, ?, ?, ?, ?) ";
                db.query(
                  insertActivityQuery,
                  [
                    req.body.name,
                    req.body.category,
                    req.body.description,
                    req.body.duration,
                    req.body.difficulty,
                    data.insertId,
                  ],
                  (err, data) => {
                    if (err) {
                      return res.status(500).send("Internal server error.");
                    }

                    return res
                      .status(201)
                      .send("Activity successfully created.");
                  }
                );
              } else {
                return res.status(500).send("Internal server error.");
              }
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
 * /api/activity/{id}:
 *   delete:
 *     tags:
 *       - Activities
 *     summary: Delete the activity
 *     description: Delete the activity by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the activity to delete.
 *     responses:
 *       '200':
 *         description: Activity successfully deleted.
 *       '404':
 *         description: Activity with that ID not found.
 *       '500':
 *         description: Internal server error.
 */
const deleteActivity = (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send("Bad request.");
    // >> Check if activity exists
    const checkIfActivityExistQuery = "SELECT * FROM activities WHERE id = ?";

    db.query(checkIfActivityExistQuery, [req.params.id], (err, data) => {
      if (err) {
        return res.status(500).send("Internal server error.");
      }

      if (data.length !== 0) {
        const deleteActivityQuery = "DELETE FROM activities WHERE id = ?";

        db.query(deleteActivityQuery, [req.params.id], (err, data) => {
          if (err) {
            return res.status(500).send("Internal server error.");
          }

          return res.status(200).send("Activity successfully deleted.");
        });
      } else {
        return res.status(404).send("That activity does not exist.");
      }
    });
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

/**
 * @swagger
 * /api/activity/{id}:
 *   patch:
 *     tags:
 *       - Activities
 *     summary: Edit an activity
 *     description: Edit an existing activity by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the activity to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the activity.
 *               description:
 *                 type: string
 *                 description: The new description of the activity.
 *               category:
 *                 type: string
 *                 description: The new category of the activity.
 *               duration:
 *                 type: string
 *                 description: The new duration of the activity.
 *               difficulty:
 *                 type: string
 *                 description: The new difficulty level of the activity.
 *               latitude:
 *                 type: number
 *                 description: The new latitude coordinate of the activity location.
 *               longitude:
 *                 type: number
 *                 description: The new longitude coordinate of the activity location.
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
 *         description: Activity successfully updated.
 *       '404':
 *         description: Activity with that ID not found.
 *       '500':
 *         description: Internal server error.
 */
const editActivity = (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send("Bad request.");
    // >> Check if activity exists
    const checkIfActivityExistQuery =
      "SELECT * FROM activities INNER JOIN location ON location.id = activities.location_id WHERE activities.id = ? LIMIT 1";

    db.query(checkIfActivityExistQuery, [req.params.id], (err, data) => {
      if (data.length !== 0) {
        const editActivityQuery =
          "UPDATE activities SET name = ?, description = ?, category = ?, duration = ?, difficulty = ? WHERE activities.id = ?";

        db.query(
          editActivityQuery,
          [
            req.body.name,
            req.body.description,
            req.body.category,
            req.body.duration,
            req.body.difficulty,
            req.params.id,
          ],
          (err, updateResult) => {
            if (err) {
              return res.status(500).send("Internal server error.");
            }

            // Check if any rows were affected by the update
            const getEditedActivityQuery =
              "SELECT * FROM activities INNER JOIN location ON location.id = activities.location_id WHERE activities.id = ? LIMIT 1";
            db.query(getEditedActivityQuery, [req.params.id], (err, data) => {
              if (err) {
                return res.status(500).send("Internal server error.");
              }

              if (data.length > 0) {
                const editActivityLocationQuery =
                  "UPDATE location SET latitude = ?, longitude = ?, address = ?, city = ?, country = ?, postal_code = ? WHERE id = ?";
                db.query(editActivityLocationQuery, [
                  req.body.latitude,
                  req.body.longitude,
                  req.body.address,
                  req.body.city,
                  req.body.country,
                  req.body.postal_code,
                  data[0].location_id,
                ]);
                return res.status(200).json("Activity successfully updated.");
              } else {
                return res.status(404).send("Activity not found.");
              }
            });
          }
        );
      } else return res.status(404).send("That activity does not exist.");
    });
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

module.exports = {
  getAllActivities,
  deleteActivity,
  createNewActivity,
  editActivity,
};
