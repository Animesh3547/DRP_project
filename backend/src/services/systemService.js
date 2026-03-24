export function computeSystemState(sensor) {

  if (!sensor) {
    return {
      fanState: "OFF",
      ventilationScore: 0,
      systemHealth: "No Data",
      maintenance: {
        fan: "Unknown",
        gasSensor: "Unknown",
        tempSensor: "Unknown"
      }
    };
  }

  const { gas, temperature, rpm, current } = sensor;

  /* FAN STATE */
  let fanState = rpm > 0 ? "ON" : "OFF";

  /* VENTILATION SCORE */
  let ventilationScore = Math.min(
    100,
    Math.round((rpm / 1500) * 100)
  );

  /* SYSTEM HEALTH */
  let systemHealth = "Healthy";

  if (gas > 500 || temperature > 50) {
    systemHealth = "Hazard";
  }

  if (rpm === 0 && current > 0.3) {
    systemHealth = "Fan Fault";
  }

  /* MAINTENANCE */
  const maintenance = {
    fan: rpm < 500 ? "Service Soon" : "OK",
    gasSensor: gas > 1000 ? "Check Sensor" : "OK",
    tempSensor: temperature > 80 ? "Check Sensor" : "OK"
  };

  return {
    fanState,
    ventilationScore,
    systemHealth,
    maintenance
  };
}