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

module.exports = {
  getAllReviews,
  getAllUnapprovedReviews,
  getAllApprovedReviews,
};
