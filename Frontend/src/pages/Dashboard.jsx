import { useEffect, useState } from "react";
import FanIcon from "../components/FanIcon";
import Navbar from "../components/Navbar";   
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
  const [darkMode, setDarkMode] = useState(true);

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

        setGasHistory(trends?.map(t => t.gas) || []);
        setTempHistory(trends?.map(t => t.temperature) || []);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);

  }, []);

  if (!systemData) return <div className="p-6 text-center">Loading...</div>;

  const isGasDanger = systemData.gas > 500;
  const isTempDanger = systemData.temperature > 40;
  const isFailure = systemData.systemHealth !== "Healthy";

  const bgClass = darkMode
    ? "bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white"
    : "bg-gradient-to-br from-slate-100 to-blue-200 text-black";

  return (
    <div className={`min-h-screen ${bgClass}`}>

      {/* ✅ NAVBAR (TOP LEVEL) */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* ✅ CONTENT WRAPPER */}
      <div className="px-4 sm:px-6 lg:px-10 py-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Smart Exhaust System
            </h1>
            <p className="text-sm opacity-60">
              Real-time Digital Twin Monitoring
            </p>
          </div>
        </div>

        {/* STATUS BAR */}
        <div className="mb-8 p-4 rounded-xl bg-white/10 backdrop-blur border border-white/10 flex justify-between items-center">
          <span className="text-sm opacity-70">System Status</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            systemData.systemHealth === "Healthy"
              ? "bg-green-500/20 text-green-400"
              : systemData.systemHealth === "Hazard"
              ? "bg-red-500/20 text-red-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}>
            {systemData.systemHealth}
          </span>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

          <GlassCard danger={isGasDanger}>
            <p className="text-sm opacity-70">Gas Level</p>
            <h2 className="text-3xl font-bold mt-2">{systemData.gas} ppm</h2>
          </GlassCard>

          <GlassCard danger={isTempDanger}>
            <p className="text-sm opacity-70">Temperature</p>
            <h2 className="text-3xl font-bold mt-2">{systemData.temperature} °C</h2>
          </GlassCard>

          <GlassCard>
            <p className="text-sm opacity-70">Ventilation</p>
            <h2 className="text-3xl font-bold mt-2 text-blue-400">
              {systemData.ventilationScore}%
            </h2>
          </GlassCard>

          <GlassCard>
            <p className="text-sm opacity-70">Fan State</p>
            <div className="flex items-center gap-3 mt-2">
              <FanIcon isOn={systemData.fanState === "ON"} />
              <span>{systemData.fanState}</span>
            </div>
          </GlassCard>

          <GlassCard>
            <p className="text-sm opacity-70">Maintenance</p>
            <p className="text-sm mt-2">Fan: {systemData.maintenance.fan}</p>
            <p className="text-sm">Gas: {systemData.maintenance.gasSensor}</p>
            <p className="text-sm">Temp: {systemData.maintenance.tempSensor}</p>
          </GlassCard>

          <GlassCard danger={isFailure}>
            <p className="text-sm opacity-70">System Health</p>
            <h2 className="text-xl font-semibold mt-2">
              {systemData.systemHealth}
            </h2>
          </GlassCard>

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <ChartCard title="Gas Trend">
            <Line
              data={{
                labels: gasHistory.map((_, i) => i),
                datasets: [{
                  data: gasHistory,
                  borderColor: "#ef4444",
                  borderWidth: 2,
                  tension: 0.4
                }]
              }}
              options={chartOptions(darkMode)}
            />
          </ChartCard>

          <ChartCard title="Temperature Trend">
            <Line
              data={{
                labels: tempHistory.map((_, i) => i),
                datasets: [{
                  data: tempHistory,
                  borderColor: "#3b82f6",
                  borderWidth: 2,
                  tension: 0.4
                }]
              }}
              options={chartOptions(darkMode)}
            />
          </ChartCard>

        </div>

      </div> 

    </div>  
  );
}

/* GLASS CARD */
function GlassCard({ children, danger }) {
  return (
    <div className={`p-5 rounded-xl backdrop-blur bg-white/10 border border-white/10 shadow-lg transition ${
      danger ? "animate-pulse border-red-500 bg-red-500/10" : "hover:scale-[1.02]"
    }`}>
      {children}
    </div>
  );
}

/* CHART CARD */
function ChartCard({ title, children }) {
  return (
    <div className="p-5 rounded-xl backdrop-blur bg-white/10 border border-white/10 shadow-lg">
      <p className="text-sm opacity-70 mb-3">{title}</p>
      {children}
    </div>
  );
}

/* CHART OPTIONS */
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