const BASE_URL = "http://localhost:5000/api";

export async function getLatestSensor() {
  const res = await fetch(`${BASE_URL}/sensors/latest`);
  return res.json();
}

export async function getSystemState() {
  const res = await fetch(`${BASE_URL}/system/state`);
  return res.json();
}

export async function getTrends() {
  const res = await fetch(`${BASE_URL}/sensors/trends`);
  return res.json();
}