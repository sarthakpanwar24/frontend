import React from "react";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllVoucher from "./AllVoucher.jsx";
import Home from "./Home.jsx";

export default function App() {
  
  return (
    <div className="max-w-5xl mx-auto p-4">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allvouchers" element={<AllVoucher />} />
        </Routes>
    </div>
  );
}
