import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Info,
  Mail,
  Sun,
  Moon
} from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {

  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/logs", label: "Logs", icon: <FileText size={18} /> },
    { to: "/about", label: "About", icon: <Info size={18} /> },
    { to: "/contact", label: "Contact", icon: <Mail size={18} /> },
  ];

  return (
    <nav className="w-full px-4 sm:px-6 lg:px-10 py-4 mb-6 
    backdrop-blur bg-white/10 border-b border-white/10 shadow-sm">

      <div className="flex items-center justify-between">

        {/* LOGO */}
        <div className="text-lg sm:text-xl font-bold">
          Smart Exhaust
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">

          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-2 hover:text-blue-400 transition"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          {/* DARK MODE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex items-center gap-3 md:hidden">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded bg-white/10 border border-white/20"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

      </div>

      {/* MOBILE MENU (ANIMATED) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 text-sm font-medium">

          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/10 transition"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

        </div>
      </div>

    </nav>
  );
}