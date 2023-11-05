const dotenv = require('dotenv');
dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Travelnik API Documentation",
      version: "0.1.0",
      description:
        "This is a web application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Travelnik",
        url: "https://travelnik.ba",
        email: "info@travelnik.ba",
      },
    },
    servers: [
      {
        url: process.env.BACKEND_URL,
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"],
};

const BUSINESS_CATEGORIES = [
  'Restaurant', // 1
  'GasStation', // 2
  'Hotel', // 3
  'BusStation', // 4
  'Gym', // 5 
  'Hospital', // 6
  'Taxi', // 7
  'Cinema', // 8
  'Market', // 9
  'Muzej', // 10
  'Diskoteka', // 11
  'TrzniCentar' // 12
];

const INTEREST_CATEGORIES = {
  'History': [2, 3, 4, 6, 7, 8, 10],
  'Art': [2, 3, 4, 6, 7, 8, 10],
  'Food': [1, 2, 9],
  'Music': [1, 2, 4, 5, 6, 7, 8, 9, 11],
  'Hiking': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  'Fashion': [2, 4, 7, 9, 12],
  'Sport': [1, 3, 4, 5, 6, 7, 9],
};

module.exports = { swaggerOptions, BUSINESS_CATEGORIES, INTEREST_CATEGORIES };