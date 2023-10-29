import axios from "axios";
import { db } from "../database/database.js";
import { bookingApiOptions } from "../utils/booking_api.js";
import { logger } from "../utils/logger.js";

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
export const getAllAccomodation = (req, res) => {
  try {
    const getAccommodationWithFiltersQuery = "SELECT * FROM accommodation";
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

export const updateAccommodation = async (req, res) => {
  try {
    const bookingApiResponse = await axios.request(
      bookingApiOptions("2023-11-01", "2023-11-02")
    );

    const accommodations = bookingApiResponse.data.result;

    accommodations.forEach((accommodation) => {
      // >> Check if accommodation exist
      const checkIfAccommodationExist =
        "SELECT * FROM accommodation WHERE source = ?";
      db.query(checkIfAccommodationExist, [accommodation.url], (err, data) => {
        // >> If accommodation does not exist, insert it into database.
        if (data.length === 0) {
          const insertNewAccommodationQuery =
            "INSERT INTO accommodation (source, image, title, rating, price, distance_from_center, reviews, status, longitude, latitude, check_in_time, check_out_time, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          const values = [
            accommodation.url,
            accommodation.main_photo_url,
            accommodation.hotel_name,
            accommodation.review_score,
            accommodation.min_total_price,
            accommodation.distance_to_cc,
            accommodation.review_nr,
            accommodation.review_score_word,
            accommodation.longitude,
            accommodation.latitude,
            accommodation.checkout.from,
            accommodation.checkout.until,
            accommodation.address,
          ];
          db.query(insertNewAccommodationQuery, values);
        }
      });
    });

    return res.status(200).send("Accommodation successfully updated.");
  } catch (error) {
    logger.error(error);
    return res.status(500).send("Internal server error.");
  }
};
