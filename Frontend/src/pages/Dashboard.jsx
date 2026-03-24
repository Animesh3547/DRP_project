import { useEffect, useState } from "react";
import FanIcon from "../components/FanIcon";
import { getLatestSensor, getSystemState, getTrends } from "../services/api";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Dashboard() {

  const [systemData, setSystemData] = useState(null);
  const [gasHistory, setGasHistory] = useState([]);
  const [tempHistory, setTempHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const sensor = await getLatestSensor();
        const system = await getSystemState();
        const trends = await getTrends();

        setSystemData({
          gas: sensor?.gas || 0,
          temperature: sensor?.temperature || 0,
          rpm: sensor?.rpm || 0,
          current: sensor?.current || 0,
          fanState: system?.system?.fanState || "OFF",
          ventilationScore: system?.system?.ventilationScore || 0,
          systemHealth: system?.system?.systemHealth || "Unknown",
          maintenance: system?.system?.maintenance || {
            fan: "-",
            gasSensor: "-",
            tempSensor: "-"
          }
        });

        setGasHistory(trends.map(t => t.gas));
        setTempHistory(trends.map(t => t.temperature));

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);

  }, []);

  if (!systemData) return <div className="p-10">Loading...</div>;

  const isGasDanger = systemData.gas > 500;
  const isTempDanger = systemData.temperature > 40;
  const isFailure = systemData.systemHealth !== "Healthy";

  const bannerColor =
    systemData.systemHealth === "Healthy"
      ? "bg-green-500"
      : systemData.systemHealth === "Hazard"
      ? "bg-red-600"
      : "bg-yellow-500";

  const bgClass = darkMode
    ? "bg-gradient-to-br from-gray-900 to-slate-800 text-gray-100"
    : "bg-gradient-to-br from-slate-100 to-blue-200 text-gray-900";

  return (
    <div className={`min-h-screen p-10 transition-all duration-500 ${bgClass}`}>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Smart Exhaust Digital Twin
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg bg-gray-700 text-white"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

      </div>

      {/* SAFETY BANNER */}
      <div className={`${bannerColor} text-white p-4 rounded-xl mb-10 text-center text-lg font-semibold`}>
        System Status: {systemData.systemHealth}
      </div>

      {/* TOP CARDS */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">

        <Card danger={isGasDanger} darkMode={darkMode}>
          <h2 className="text-sm opacity-70">Gas Level</h2>
          <p className="text-4xl font-bold mt-3">
            {systemData.gas} ppm
          </p>
        </Card>

        <Card danger={isTempDanger} darkMode={darkMode}>
          <h2 className="text-sm opacity-70">Room Temperature</h2>
          <p className="text-4xl font-bold mt-3">
            {systemData.temperature} °C
          </p>
        </Card>

        <Card darkMode={darkMode}>
          <h2 className="text-sm opacity-70">Ventilation Score</h2>
          <p className="text-4xl font-bold text-blue-500 mt-3">
            {systemData.ventilationScore} %
          </p>
        </Card>

      </div>

      {/* SECOND ROW */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">

        <Card darkMode={darkMode}>
          <h2 className="text-sm opacity-70 mb-2">Fan State</h2>

          <div className="flex items-center gap-4">

            <FanIcon
              isOn={systemData.fanState === "ON"}
              darkMode={darkMode}
            />

            <span className="text-lg font-semibold">
              {systemData.fanState}
            </span>

          </div>
        </Card>

        <Card darkMode={darkMode}>
          <h2 className="text-sm opacity-70 mb-2">Maintenance</h2>

          <p>Fan: {systemData.maintenance.fan}</p>
          <p>Gas Sensor: {systemData.maintenance.gasSensor}</p>
          <p>Temp Sensor: {systemData.maintenance.tempSensor}</p>

        </Card>

        <Card danger={isFailure} darkMode={darkMode}>
          <h2 className="text-sm opacity-70 mb-2">System Health</h2>

          <p className="font-semibold">
            {systemData.systemHealth}
          </p>

        </Card>

      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-8">

        <ChartCard title="Gas Trend" darkMode={darkMode}>

          <Line
            data={{
              labels: gasHistory.map((_, i) => i),
              datasets: [{
                data: gasHistory,
                borderColor: "#ef4444",
                borderWidth: 3,
                tension: 0.4
              }]
            }}
            options={chartOptions(darkMode)}
          />

        </ChartCard>

        <ChartCard title="Temperature Trend" darkMode={darkMode}>

          <Line
            data={{
              labels: tempHistory.map((_, i) => i),
              datasets: [{
                data: tempHistory,
                borderColor: "#3b82f6",
                borderWidth: 3,
                tension: 0.4
              }]
            }}
            options={chartOptions(darkMode)}
          />

        </ChartCard>

      </div>

    </div>
  );
}

function Card({ children, danger, darkMode }) {

  const base = darkMode
    ? "bg-gray-800 text-gray-100"
    : "bg-white text-gray-900";

  return (
    <div
      className={`${base} rounded-2xl shadow-lg p-6 transition-all duration-300 ${
        danger ? "border-2 border-red-500 bg-red-100 animate-pulse text-black" : ""
      }`}
    >
      {children}
    </div>
  );
}

function ChartCard({ title, children, darkMode }) {

  const base = darkMode
    ? "bg-gray-800 text-gray-100"
    : "bg-white text-gray-900";

  return (
    <div className={`${base} rounded-2xl shadow-lg p-6`}>
      <h3 className="text-sm mb-4 opacity-70">{title}</h3>
      {children}
    </div>
  );
}

function chartOptions(darkMode) {

  return {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        grid: { color: darkMode ? "#374151" : "#e5e7eb" },
        ticks: { color: darkMode ? "#e5e7eb" : "#374151" }
      },
      x: {
        grid: { display: false },
        ticks: { color: darkMode ? "#e5e7eb" : "#374151" }
      }
    }
  };
}