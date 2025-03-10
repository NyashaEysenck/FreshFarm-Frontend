import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-600 p-4 shadow-md">
      <ul className="flex space-x-6 justify-center">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/farm-sales" className="nav-link">Farm Sales</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
