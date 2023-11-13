const express = require("express");
const {
  getAllReviews,
  getAllUnapprovedReviews,
  getAllApprovedReviews,
  updateReviewStatus,
  deleteReview,
} = require("../controllers/review.controller.js");
const { VerifyToken } = require("../middlewares/authentication.js");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the review.
 *         name:
 *           type: string
 *           description: The name of the person providing the review.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the review was submitted.
 *         text:
 *           type: string
 *           description: The text content of the review.
 *         rate:
 *           type: tinyint
 *           description: The rating given in the review.
 *         images:
 *           type: longtext
 *           description: A string representing the images associated with the review.
 *         approved:
 *           type: tinyint
 *           description: Indicates whether the review has been approved.
 *         entity_id:
 *           type: integer
 *           description: The ID of the entity (activity or business) associated with the review.
 *         entity_type:
 *           type: enum
 *           enum:
 *             - activity
 *             - business
 *           description: The type of entity associated with the review.
 *
 *       example:
 *         id: 1
 *         name: "Ibrahim Okić"
 *         date: "2023-11-13T22:06:56.328Z"
 *         text: "gaga"
 *         rate: 3
 *         images: null
 *         approved: false
 *         entity_id: 13
 *         entity_type: "activity"
 */

router.get("/", VerifyToken, getAllReviews);
router.get("/approved", VerifyToken, getAllApprovedReviews);
router.get("/unapproved", VerifyToken, getAllUnapprovedReviews);
router.patch("/", VerifyToken, updateReviewStatus);
router.delete("/:id", VerifyToken, deleteReview);

module.exports = router;
