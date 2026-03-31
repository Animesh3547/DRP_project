export default function About() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-10">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          About Smart Exhaust System
        </h1>

        <p className="text-sm sm:text-base opacity-70 leading-relaxed">
          This project is a real-time digital twin system designed to monitor
          environmental conditions and ensure safety through intelligent ventilation.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto grid gap-6">

        {/* CARD 1 */}
        <SectionCard title="Purpose">
          The system continuously monitors gas concentration, temperature,
          and electrical parameters to detect hazardous conditions and
          automatically control ventilation.
        </SectionCard>

        {/* CARD 2 */}
        <SectionCard title="How It Works">
          Sensor data from ESP32 is transmitted to a cloud backend where it is
          processed and visualized in real-time through this dashboard.
        </SectionCard>

        {/* CARD 3 */}
        <SectionCard title="Key Features">
          <ul className="list-disc pl-5 space-y-1">
            <li>Real-time gas and temperature monitoring</li>
            <li>Automated fan control using intelligent logic</li>
            <li>System health diagnostics</li>
            <li>Maintenance prediction (upcoming ML integration)</li>
          </ul>
        </SectionCard>

        {/* CARD 4 */}
        <SectionCard title="Tech Stack">
          <ul className="list-disc pl-5 space-y-1">
            <li>Frontend: React + Tailwind</li>
            <li>Backend: Node.js + Express</li>
            <li>Database: MongoDB Atlas</li>
            <li>Hardware: ESP32 + Sensors</li>
          </ul>
        </SectionCard>

      </div>

    </div>
  );
}


/* REUSABLE CARD */
function SectionCard({ title, children }) {
  return (
    <div className="p-6 rounded-xl backdrop-blur bg-white/10 border border-white/10 shadow-lg">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="text-sm opacity-80 leading-relaxed">
        {children}
      </div>
    </div>
  );
}