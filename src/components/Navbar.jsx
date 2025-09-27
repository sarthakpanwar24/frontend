import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">VR Management App</h1>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/allvouchers"
              className="hover:text-yellow-400 transition duration-300"
            >
              All Vouchers
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
