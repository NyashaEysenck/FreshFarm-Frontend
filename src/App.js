import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles.css";
import Index from "./pages/Index";
import FarmSales from "./pages/FarmSales";

function App() {
  const [submissions, setSubmissions] = useState([]);

  const handleFormSubmit = (formData) => {
    setSubmissions([...submissions, formData]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index onSubmit={handleFormSubmit} />} />
        <Route path="/farm-sales" element={<FarmSales submissions={submissions} />} />
      </Routes>
    </Router>
  );
}

export default App;

