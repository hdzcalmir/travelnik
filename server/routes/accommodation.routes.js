import {
  getAllAccomodation,
  updateAccommodation,
} from "../controllers/accommodation.controller.js";
import express from "express";

const router = express.Router();

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

router.get("/", getAllAccomodation);
router.patch("/", updateAccommodation);

export default router;
