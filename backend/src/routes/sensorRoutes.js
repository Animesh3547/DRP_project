import express from "express";

import {
  createSensorLog,
  getLatestSensor,
  getSensorTrends
} from "../controllers/sensorController.js";

const router = express.Router();

/* ingest sensor data */
router.post("/", createSensorLog);

/* latest reading */
router.get("/latest", getLatestSensor);

/* trend data */
router.get("/trends", getSensorTrends);

export default router;