const {
  getAllEvents,
  deleteEvent,
  editEvent,
  createNewEvent,
} = require("../controllers/event.controller.js");
const express = require("express");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the event.
 *         location_id:
 *           type: integer
 *           description: The ID of the location associated with the event.
 *         name:
 *           type: string
 *           description: The name of the event.
 *         description:
 *           type: string
 *           description: A description of the event.
 *         category:
 *           type: string
 *           description: The category of the event.
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: The start date and time of the event.
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: The end date and time of the event.
 *
 *       example:
 *         id: 1
 *         location_id: 2
 *         name: Sample Event
 *         description: This is a sample event.
 *         category: Concert
 *         start_date: 2023-11-09T12:00:00Z
 *         end_date: 2023-11-09T14:00:00Z
 */

router.get("/", getAllEvents);
router.delete("/:id", deleteEvent);
router.patch("/:id", editEvent);
router.post("/", createNewEvent);

module.exports = router;
