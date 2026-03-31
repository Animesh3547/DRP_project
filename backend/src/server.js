import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import healthRoutes from "./routes/healthRoutes.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import systemRoutes from "./routes/systemRoutes.js";
// import { startSensorSimulation } from "./services/sensorSimulator.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/system", systemRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 5000;

/* 🔥 IMPORTANT FIX */
const startServer = async () => {
  try {
    await connectDB();   // wait for DB

    // startSensorSimulation();  // start AFTER DB

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
};

startServer();
