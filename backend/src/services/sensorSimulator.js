import SensorLog from "../models/SensorLog.js";

let gas = 250;
let temp = 28;

export function startSensorSimulation() {

  setInterval(async () => {

    gas += Math.random() * 30 - 10;
    temp += Math.random() * 2 - 1;

    gas = Math.max(100, Math.min(700, gas));
    temp = Math.max(20, Math.min(50, temp));

    const rpm = gas > 350 ? 1200 : 0;
    const current = rpm > 0 ? 0.8 : 0.1;

    const log = new SensorLog({
      gas: Math.round(gas),
      temperature: Math.round(temp),
      current,
      rpm
    });

    await log.save();

    console.log("Simulated sensor data saved");

  }, 3000);
}