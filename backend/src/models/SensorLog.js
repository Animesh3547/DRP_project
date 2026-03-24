import mongoose from "mongoose";

const sensorLogSchema = new mongoose.Schema(
  {
    gas: {
      type: Number,
      required: true
    },
    temperature: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    rpm: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const SensorLog = mongoose.model("SensorLog", sensorLogSchema);

export default SensorLog;