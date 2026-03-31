import { useEffect, useState } from "react";
import { getTrends } from "../services/api";

export default function Logs() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getTrends();
        setLogs(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-6">

      <h1 className="text-2xl font-bold mb-6">Sensor Logs</h1>

      <div className="overflow-x-auto rounded-xl border border-white/10 backdrop-blur bg-white/10">

        <table className="w-full text-sm">

          <thead className="bg-white/10">
            <tr>
              <th className="p-3 text-left">Time</th>
              <th className="p-3">Gas</th>
              <th className="p-3">Temp</th>
              <th className="p-3">Current</th>
              <th className="p-3">RPM</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-t border-white/10 hover:bg-white/5">

                <td className="p-3">
                  {new Date(log.createdAt).toLocaleTimeString()}
                </td>

                <td className="text-center">{log.gas}</td>
                <td className="text-center">{log.temperature}°C</td>
                <td className="text-center">{log.current}A</td>
                <td className="text-center">{log.rpm}</td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}