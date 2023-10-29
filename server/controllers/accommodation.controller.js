import axios from "axios";
import { db } from "../database/database.js";
import { bookingApiOptions } from "../utils/booking_api.js";
import { logger } from "../utils/logger.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Accommodation:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the accommodation
 *         title:
 *           type: string
 *           description: The title of accommodation
 *         source:
 *           type: string
 *           description: The accommodation booking source URL
 *         image:
 *           type: string
 *           description: Thumbnail image of accommodation
 *         rating:
 *           type: number
 *           description: Rating from booking.com
 *         price:
 *           type: number
 *           description: Price of accommodation
 *         distance_from_center:
 *           type: string
 *           description: How far away accommodation is from center
 *         reviews:
 *           type: number
 *           description: Number of reviews left on booking.com
 *         status:
 *           type: string
 *           description: One keyword status of accommodation status
 *         longitude:
 *           type: number
 *           description: Longitude of accommodation
 *         latitude:
 *           type: number
 *           description: Latitude of accommodation
 *         check_in_time:
 *           type: string
 *           description: Time for checking in
 *         check_out_time:
 *           type: string
 *           description: Time for checking out
 *         address:
 *           type: string
 *           description: Address of accommodation
 *       example:
 *         id: 1
 *         title: Luxury Hotel
 *         source: https://www.example.com/hotel
 *         image: https://www.example.com/images/hotel.jpg
 *         rating: 9.2
 *         price: 150
 *         distance_from_center: 1.5 miles
 *         reviews: 120
 *         status: Available
 *         longitude: 17.123456
 *         latitude: 44.654321
 *         check_in_time: 15:00
 *         check_out_time: 11:00
 *         address: 123 Main Street
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
