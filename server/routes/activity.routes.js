const { getAllActivities } = require('../controllers/activity.controller.js');
const express = require('express');


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the activity.
 *         reviewId:
 *           type: string
 *           description: The identifier for the review associated with the activity.
 *         locationId:
 *           type: string
 *           description: The identifier for the location of the activity.
 *         name:
 *           type: string
 *           description: The name of the activity.
 *         description:
 *           type: string
 *           description: A brief description of the activity.
 *         category:
 *           type: string
 *           description: The category of the activity.
 *         duration:
 *           type: string
 *           description: The duration of the activity.
 *         difficulty:
 *           type: string
 *           description: The difficulty level of the activity.
 *       example:
 *         id: "1"
 *         reviewId: "123"
 *         locationId: "456"
 *         name: Hiking
 *         description: Enjoy a scenic hike in the mountains.
 *         category: Outdoor
 *         duration: 1:30
 *         difficulty: Moderate
*/

router.get("/", getAllActivities);

module.exports = router;

