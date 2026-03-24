import SensorLog from "../models/SensorLog.js";

/* POST sensor data */
export const createSensorLog = async (req, res) => {
  try {
    const { gas, temperature, current, rpm } = req.body;

    const log = new SensorLog({
      gas,
      temperature,
      current,
      rpm
    });

    const saved = await log.save();

    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET latest sensor reading */
export const getLatestSensor = async (req, res) => {
  try {

    const latest = await SensorLog
      .findOne()
      .sort({ createdAt: -1 });

    res.json(latest);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET trend data */
export const getSensorTrends = async (req, res) => {
  try {

    const limit = parseInt(req.query.limit) || 30;

    const logs = await SensorLog
      .find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(logs.reverse());

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};