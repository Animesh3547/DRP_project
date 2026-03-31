import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

export default function App() {

  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={
      darkMode
        ? "min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white"
        : "min-h-screen bg-gradient-to-br from-slate-100 to-blue-200 text-black"
    }>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />

    </div>
  );
}