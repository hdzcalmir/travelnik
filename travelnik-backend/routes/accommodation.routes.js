import {
  getAllAccomodation,
  updateAccommodation,
} from "../controllers/accommodation.controller.js";
import express from "express";

const router = express.Router();

router.get("/", getAllAccomodation);
router.patch("/", updateAccommodation);

export default router;
