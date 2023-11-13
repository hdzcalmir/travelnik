const {
  getAllBusinesses,
  createNewBusiness,
  deleteBusiness,
  editBusiness,
  businessFeedback,
} = require("../controllers/business.controller.js");
const express = require("express");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Business:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the business.
 *         reviewId:
 *           type: string
 *           description: The identifier for the review associated with the business.
 *         locationId:
 *           type: string
 *           description: The identifier for the location of the business.
 *         name:
 *           type: string
 *           description: The name of the business.
 *         description:
 *           type: string
 *           description: A brief description of the business.
 *         category:
 *           type: string
 *           description: The category of the business.
 *         openingTime:
 *           type: string
 *           description: The opening time of the business.
 *         closingTime:
 *           type: string
 *           description: The closing time of the business.
 *       example:
 *         id: "1"
 *         reviewId: "123"
 *         locationId: "456"
 *         name: ABC Cafe
 *         description: A cozy cafe with a variety of beverages and snacks.
 *         category: Cafe
 *         openingTime: 08:00 AM
 *         closingTime: 10:00 PM
 */

router.get("/", getAllBusinesses);
router.post("/", createNewBusiness);
router.delete("/:id", deleteBusiness);
router.patch("/:id", editBusiness);

router.post("/review", businessFeedback);

module.exports = router;
