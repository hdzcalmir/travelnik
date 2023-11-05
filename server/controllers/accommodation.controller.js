const axios = require("axios");
const db = require("../database/database.js");
const { bookingApiOptions } = require("../utils/booking_api.js");
const { logger } = require("../utils/logger.js");
const Accommodation = require("../models/Accommodation.js");

/**
 * @swagger
 * /api/accommodation:
 *   get:
 *     tags:
 *       - Accommodations
 *     summary: Get All Accommodations
 *     description: Retrieve a list of all accommodations.
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Accommodation'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error.
 */
const getAllAccomodation = (req, res) => {
  try {
    const getAccommodationWithFiltersQuery = "SELECT * FROM accommodations ORDER BY id DESC LIMIT 15";
    db.query(getAccommodationWithFiltersQuery, (err, data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

/**
 * @swagger
 * /api/accommodation:
 *   patch:
 *     tags:
 *       - Accommodations
 *     summary: Update Accommodations from Booking API
 *     description: Retrieve and update accommodations from the Booking API.
 *     responses:
 *       '200':
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               message: Accommodation successfully updated.
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error.
 */
const updateAccommodation = async (req, res) => {
  try {
    const today = new Date();
    const tomorrow = new Date();

    tomorrow.setDate(today.getDate() + 1);

    const formattedToday = today.toISOString().slice(0, 10);
    const formattedTomorrow = tomorrow.toISOString().slice(0, 10);

    const bookingApiResponse = await axios.request(
      bookingApiOptions(formattedToday, formattedTomorrow)
    );

    const accommodationsData = bookingApiResponse.data.result;

    const accommodations = accommodationsData.map((accommodationData) => {
      return new Accommodation(
        accommodationData.url,
        accommodationData.main_photo_url,
        accommodationData.hotel_name,
        accommodationData.review_score,
        accommodationData.min_total_price,
        accommodationData.distance_to_cc,
        accommodationData.review_nr,
        accommodationData.review_score_word,
        accommodationData.longitude,
        accommodationData.latitude,
        accommodationData.checkout.from,
        accommodationData.checkout.until,
        accommodationData.address
      );
    });

    accommodations.forEach((accommodation) => {
      // >> Check if accommodation exist
      const checkIfAccommodationExist =
        "SELECT * FROM accommodations WHERE source = ?";
      db.query(
        checkIfAccommodationExist,
        [accommodation.source],
        (err, data) => {
          // >> If accommodation does not exist, insert it into database.
          if (data.length === 0) {
            const insertNewAccommodationQuery =
              "INSERT INTO accommodations (source, image, title, rating, price, distance_from_center, reviews, status, longitude, latitude, check_in_time, check_out_time, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const values = [
              accommodation.source,
              accommodation.image,
              accommodation.title,
              accommodation.rating,
              accommodation.price,
              accommodation.distance_from_center,
              accommodation.reviews,
              accommodation.status,
              accommodation.longitude,
              accommodation.latitude,
              accommodation.check_in_time,
              accommodation.check_out_time,
              accommodation.address,
            ];
            db.query(insertNewAccommodationQuery, values);
          }
        }
      );
    });

    return res.status(200).send("Accommodation successfully updated.");
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

module.exports = {
  getAllAccomodation,
  updateAccommodation,
};
