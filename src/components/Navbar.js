import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav aria-label="Main Navigation">
      <ul style={{ 
        listStyle: "none", 
        display: "flex", 
        padding: "10px", 
        background: "#4CAF50",
        gap: "15px"
      }}>
        <li><Link to="/" style={linkStyle}>Home</Link></li>
        <li><Link to="/farm-sales" style={linkStyle}>Farm Sales</Link></li>
      </ul>
    </nav>
  );
};

const linkStyle = {
  color: "#ffffff", // White for high contrast
  backgroundColor: "#2E7D32", // Darker green for better contrast
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "8px 12px",
  borderRadius: "5px"
};


export default Navbar;
