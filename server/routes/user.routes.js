const { getAllUsers } = require('../controllers/user.controller.js');
const express = require('express');


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the event.
 *         locationId:
 *           type: string
 *           description: The identifier for the event location.
 *         name:
 *           type: string
 *           description: The name of the event.
 *         description:
 *           type: string
 *           description: A brief description of the event.
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
 *       example:
 *         id: "1"
 *         locationId: "123"
 *         name: Sample Event
 *         description: This is a sample event description.
 *         category: Music
 *         start_date: "2023-11-01T10:00:00Z"
 *         end_date: "2023-11-01T18:00:00Z"
 */

router.get("/", getAllUsers);

module.exports = router;

