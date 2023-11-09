const { getAllLocations } = require("../controllers/location.controller.js");
const express = require("express");

const router = express.Router();

router.get("/", getAllLocations);

module.exports = router;
