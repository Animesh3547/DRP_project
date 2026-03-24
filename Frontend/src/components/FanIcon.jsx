export default function FanIcon({ isOn, darkMode }) {
  const bladeColor = darkMode ? "#60a5fa" : "#2563eb";
  const centerColor = darkMode ? "#e5e7eb" : "#1f2937";

  return (
    <div className="flex items-center justify-center">
      <svg
        className={`${isOn ? "animate-spin" : ""}`}
        style={{ animationDuration: "1s" }}
        width="70"
        height="70"
        viewBox="0 0 100 100"
      >
        {/* Outer ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={bladeColor}
          strokeWidth="4"
          fill="none"
        />

        {/* Center hub */}
        <circle cx="50" cy="50" r="8" fill={centerColor} />

        {/* Blades */}
        <path
          d="M50 15 Q60 35 50 50 Q40 35 50 15Z"
          fill={bladeColor}
        />
        <path
          d="M85 50 Q65 60 50 50 Q65 40 85 50Z"
          fill={bladeColor}
        />
        <path
          d="M50 85 Q40 65 50 50 Q60 65 50 85Z"
          fill={bladeColor}
        />
        <path
          d="M15 50 Q35 40 50 50 Q35 60 15 50Z"
          fill={bladeColor}
        />
      </svg>
    </div>
  );
}