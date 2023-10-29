// >> Libraries
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./utils/constants.js";

dotenv.config();
const app = express();

// >> Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// >> Controllers
import accommodationRoutes from "./routes/accommodation.routes.js";

// >> API Routes
app.use("/api/accommodation", accommodationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`API-SERVER >> Server running on port ${process.env.PORT}`);
});
