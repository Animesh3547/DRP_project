import { Link } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="w-full px-4 sm:px-6 lg:px-10 py-4 mb-6 
    flex items-center justify-between 
    backdrop-blur bg-white/10 border-b border-white/10 shadow-sm">

      {/* LEFT - LOGO */}
      <div className="text-lg sm:text-xl font-bold tracking-wide">
        Smart Exhaust
      </div>

      {/* CENTER - NAV LINKS */}
      <div className="flex gap-4 text-xs sm:text-sm md:text-base">
        <Link to="/" className="hover:text-blue-400 transition">
          Dashboard
        </Link>

        <Link to="/logs" className="hover:text-blue-400 transition">
          Logs
        </Link>

        <Link to="/about" className="hover:text-blue-400 transition">
          About
        </Link>

       <Link to="/contact" className="hover:text-blue-400 transition">
          Contact Us
        </Link>

      </div>

      {/* RIGHT - CONTROLS */}
      <div className="flex items-center gap-3">

        {/* STATUS DOT */}
        <div className="hidden sm:flex items-center gap-2 text-sm opacity-70">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Live
        </div>

        {/* DARK MODE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1.5 text-sm rounded-lg 
          bg-white/10 border border-white/20 
          hover:bg-white/20 transition"
        >
          {darkMode ? "Light" : "Dark"}
        </button>

      </div>
    </nav>
  );
}