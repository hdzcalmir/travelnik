const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require("cookie-parser");
const { swaggerOptions } = require("./utils/constants.js");

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const accommodationRoutes = require("./routes/accommodation.routes.js");
const activityRoutes = require("./routes/activity.routes.js");
const businessRoutes = require("./routes/business.routes.js");
const eventRoutes = require("./routes/event.routes.js");
const userRoutes = require("./routes/user.routes.js");
const locationRoutes = require("./routes/location.routes.js");

app.use("/api/accommodation", accommodationRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/user", userRoutes);
app.use("/api/location", locationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`API-SERVER >> Server running on port ${process.env.PORT}`);
});
