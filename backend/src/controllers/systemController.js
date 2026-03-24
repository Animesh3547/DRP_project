import SensorLog from "../models/SensorLog.js";
import { computeSystemState } from "../services/systemService.js";

export const getSystemState = async (req, res) => {
  try {
    const latest = await SensorLog
      .findOne()
      .sort({ createdAt: -1 });

    const systemState = computeSystemState(latest);

    res.json({
      sensor: latest,
      system: systemState
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};