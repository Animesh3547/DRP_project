import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import healthRoutes from "./routes/healthRoutes.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import systemRoutes from "./routes/systemRoutes.js";
import { startSensorSimulation } from "./services/sensorSimulator.js";

dotenv.config();

const app = express();

connectDB();
startSensorSimulation();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/system", systemRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});