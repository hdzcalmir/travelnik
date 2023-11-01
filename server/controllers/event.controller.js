const Location = require("../models/Location");
const db = require("../database/database.js");

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

/**
 * @swagger
 * /api/event/{id}:
 *   delete:
 *     tags:
 *       - Events
 *     summary: Delete the event
 *     description: Delete the event by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the event to delete.
 *     responses:
 *       '200':
 *         description: Event successfully deleted.
 *       '404':
 *         description: Event with that ID not found.
 *       '500':
 *         description: Internal server error.
 */
const deleteEvent = (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send("Bad request.");
    // >> Check if event exist
    const checkIfEventExistQuery = "SELECT * FROM events WHERE id = ?";

    db.query(checkIfEventExistQuery, [req.params.id], (err, data) => {
      if (data.length !== 0) {
        const deleteEventQuery = "DELETE FROM events WHERE id = ?";

        db.query(deleteEventQuery, [req.params.id], (err, data) => {
          if (data) {
            return res.status(200).send("Event successfully deleted.");
          } else return res.status(404).send("That event does not exist.");
        });
      } else return res.status(404).send("That event does not exist.");
    });
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

/**
 * @swagger
 * /api/event:
 *   post:
 *     tags:
 *       - Events
 *     summary: Create a new event
 *     description: Create a new event record in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the event.
 *               category:
 *                 type: string
 *                 description: The category of the event.
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: The start date and time of the event.
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: The end date and time of the event.
 *               latitude:
 *                 type: number
 *                 description: The latitude coordinate of the event location.
 *               longitude:
 *                 type: number
 *                 description: The longitude coordinate of the event location.
 *               description:
 *                 type: string
 *                 description: A description of the event.
 *     responses:
 *       '201':
 *         description: Event successfully created.
 *       '400':
 *         description: Bad request - Invalid input provided.
 *       '409':
 *         description: Event already exists.
 *       '500':
 *         description: Internal server error.
 */
const createNewEvent = (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.category ||
      !req.body.start_date ||
      !req.body.end_date
    )
      return res.status(400).send("Bad request.");

    // >> Find if event with that data already exist
    const getEventQuery =
      "SELECT * FROM events WHERE name = ? AND category = ?";
    db.query(getEventQuery, [req.body.name, req.body.category], (err, data) => {
      if (data.length !== 0) {
        return res.status(409).send("That event already exists.");
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
              const startDate = new Date(req.body.start_date)
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");
              const endDate = new Date(req.body.end_date)
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");

              // >> If event does not exist, create it
              const insertEventQuery =
                "INSERT INTO events (name, category, description, start_date, end_date, location_id) VALUES(?, ?, ?, ?, ?, ?) ";
              db.query(insertEventQuery, [
                req.body.name,
                req.body.category,
                req.body.description,
                startDate,
                endDate,
                data.insertId,
              ]);
              return res.status(201).send("Event successfully created.");
            } else return res.status(500).send("Internal server error.");
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error.");
  }
};

/**
 * @swagger
 * /api/event/{id}:
 *   patch:
 *     tags:
 *       - Events
 *     summary: Edit an event
 *     description: Edit an existing event by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the event to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the event.
 *               description:
 *                 type: string
 *                 description: The new description of the event.
 *               category:
 *                 type: string
 *                 description: The new category of the event.
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: The new start date and time of the event.
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: The new end date and time of the event.
 *               latitude:
 *                 type: number
 *                 description: The new latitude coordinate of the business location.
 *               longitude:
 *                 type: number
 *                 description: The new longitude coordinate of the business location.
 *     responses:
 *       '200':
 *         description: Event successfully updated.
 *       '404':
 *         description: Event with that ID not found.
 *       '500':
 *         description: Internal server error.
 */

const editEvent = (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send("Bad request.");
    // >> Check if event exists
    const checkIfEventExistQuery =
      "SELECT * FROM events INNER JOIN location ON location.id = events.location_id WHERE events.id = ? LIMIT 1";

    db.query(checkIfEventExistQuery, [req.params.id], (err, data) => {
      if (data.length !== 0) {
        const startDate = new Date(req.body.start_date)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
        const endDate = new Date(req.body.end_date)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");

        const editEventQuery =
          "UPDATE events SET name = ?, description = ?, category = ?, start_date = ?, end_date = ? WHERE events.id = ?";

        db.query(
          editEventQuery,
          [
            req.body.name,
            req.body.description,
            req.body.category,
            startDate,
            endDate,
            req.params.id,
          ],
          (err, updateResult) => {
            if (err) {
              console.log(err);
              return res.status(500).send("Internal server error.");
            }

            // Check if any rows were affected by the update
            const getEditedEventQuery =
              "SELECT * FROM events INNER JOIN location ON location.id = events.location_id WHERE events.id = ? LIMIT 1";
            db.query(getEditedEventQuery, [req.params.id], (err, data) => {
              if (err) {
                console.log(err);
                return res.status(500).send("Internal server error.");
              }

              if (data.length > 0) {
                const editEventLocationQuery =
                  "UPDATE location SET latitude = ?, longitude = ? WHERE id = ?";
                db.query(editEventLocationQuery, [
                  req.body.latitude,
                  req.body.longitude,
                  data[0].location_id,
                ]);
                return res.status(200).json("Event successfully updated.");
              } else {
                return res.status(404).send("Event not found.");
              }
            });
          }
        );
      } else return res.status(404).send("That event does not exist.");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error.");
  }
};

module.exports = { createNewEvent, getAllEvents, deleteEvent, editEvent };
