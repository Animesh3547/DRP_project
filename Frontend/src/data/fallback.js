export const fallbackSensor = {
  gas: 120,
  temperature: 30,
  current: 0.4,
  rpm: 900
};

export const fallbackSystem = {
  system: {
    fanState: "ON",
    ventilationScore: 75,
    systemHealth: "Healthy",
    maintenance: {
      fan: "Good",
      gasSensor: "Good",
      tempSensor: "Good"
    }
  }
};

export const fallbackTrends = Array.from({ length: 10 }, (_, i) => ({
  gas: 100 + i * 5,
  temperature: 28 + i * 0.5
}));