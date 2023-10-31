import {
    getAllEvents,
} from "../controllers/event.controller.js";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the user.
 *         name:
 *           type: string
 *           description: The first name of the user.
 *         surname:
 *           type: string
 *           description: The last name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         role:
 *           type: string
 *           description: The role of the user. 
 *
 *       example:
 *         id: "1"
 *         name: John
 *         surname: Doe
 *         email: john.doe@example.com
 *         role: admin 
 */


router.get("/", getAllEvents);

export default router;
