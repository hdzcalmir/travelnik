import * as dotenv from "dotenv";
dotenv.config();

export const swaggerOptions = {
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
