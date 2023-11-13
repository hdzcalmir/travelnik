const db = require("../database/database.js");

/**
 * @swagger
 * /api/review:
 *   get:
 *     summary: Get all reviews
 *     description: Retrieve a list of all reviews.
 *     tags:
 *       - Reviews
 *     responses:
 *       '200':
 *         description: A list of reviews.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: "Ibrahim Okić"
 *                 date: "2023-11-13T22:06:56.328Z"
 *                 text: "gaga"
 *                 rate: 3
 *                 images: null
 *                 approved: false
 *                 entity_id: 13
 *                 entity_type: "activity"
 *               - id: 2
 *                 name: "Another User"
 *                 date: "2023-11-14T12:30:00.000Z"
 *                 text: "Great experience!"
 *                 rate: 5
 *                 images: "image.jpg"
 *                 approved: true
 *                 entity_id: 17
 *                 entity_type: "business"
 */

const getAllReviews = (req, res) => {
  try {
    const getAllReviewsQuery = "SELECT * FROM reviews";

    db.query(getAllReviewsQuery, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal server error.");
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error.");
  }
};

/**
 * @swagger
 * /api/review/unapproved:
 *   get:
 *     summary: Get all unapproved reviews
 *     description: Retrieve a list of all unapproved reviews.
 *     tags:
 *       - Reviews
 *     responses:
 *       '200':
 *         description: A list of unapproved reviews.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: "Ibrahim Okić"
 *                 date: "2023-11-13T22:06:56.328Z"
 *                 text: "gaga"
 *                 rate: 3
 *                 images: null
 *                 approved: false
 *                 entity_id: 13
 *                 entity_type: "activity"
 *               - id: 2
 *                 name: "Another User"
 *                 date: "2023-11-14T12:30:00.000Z"
 *                 text: "Great experience!"
 *                 rate: 5
 *                 images: "image.jpg"
 *                 approved: false
 *                 entity_id: 17
 *                 entity_type: "business"
 */

const getAllUnapprovedReviews = (req, res) => {
  try {
    const getAllReviewsQuery = "SELECT * FROM reviews WHERE approved = false";

    db.query(getAllReviewsQuery, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal server error.");
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error.");
  }
};

/**
 * @swagger
 * /api/review/approved:
 *   get:
 *     summary: Get all approved reviews
 *     description: Retrieve a list of all approved reviews.
 *     tags:
 *       - Reviews
 *     responses:
 *       '200':
 *         description: A list of approved reviews.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: "Ibrahim Okić"
 *                 date: "2023-11-13T22:06:56.328Z"
 *                 text: "gaga"
 *                 rate: 3
 *                 images: null
 *                 approved: true
 *                 entity_id: 13
 *                 entity_type: "activity"
 *               - id: 2
 *                 name: "Another User"
 *                 date: "2023-11-14T12:30:00.000Z"
 *                 text: "Great experience!"
 *                 rate: 5
 *                 images: "image.jpg"
 *                 approved: true
 *                 entity_id: 17
 *                 entity_type: "business"
 */

const getAllApprovedReviews = (req, res) => {
  try {
    const getAllReviewsQuery = "SELECT * FROM reviews WHERE approved = true";

    db.query(getAllReviewsQuery, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal server error.");
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error.");
  }
};

/**
 * @swagger
 * /api/review:
 *   patch:
 *     summary: Update review status
 *     description: Update the approval status of a review.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: body
 *         name: Review Status
 *         description: The ID of the review and the new status.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The ID of the review to update.
 *             status:
 *               type: boolean
 *               description: The new approval status (true/false).
 *         example:
 *           id: 1
 *           status: true
 *     responses:
 *       '200':
 *         description: Review status updated successfully.
 *       '400':
 *         description: Bad request. Provide both 'id' and 'status'.
 *       '404':
 *         description: Review not found.
 *       '500':
 *         description: Internal server error.
 */

const updateReviewStatus = (req, res) => {
  try {
    console.log(req.body);
    const { id, status } = req.body;

    if (!id) {
      return res.status(400).send("Bad request.");
    }

    const updateReviewStatusQuery =
      "UPDATE reviews SET approved = ? WHERE id = ?";

    db.query(updateReviewStatusQuery, [status, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal server error.");
      }

      if (result.affectedRows === 0) {
        return res.status(404).send("Review not found.");
      }

      return res.status(200).send("Review status updated successfully.");
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error.");
  }
};

module.exports = {
  getAllReviews,
  getAllUnapprovedReviews,
  getAllApprovedReviews,
  updateReviewStatus,
};
