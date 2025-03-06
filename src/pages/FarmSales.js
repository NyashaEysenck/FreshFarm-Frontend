import React, { useEffect, useState } from "react";

const FarmSales = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/submissions")
      .then((res) => res.json())
      .then((data) => setSubmissions(data))
      .catch((err) => console.error("Error fetching submissions:", err));
  }, []);

  return (
    <section aria-labelledby="farm-sales-header">
      <h2 id="farm-sales-header">Farm Sales Data</h2>
      {submissions.length > 0 ? (
        <ul>
          {submissions.map((submission, index) => (
            <li key={index} style={listStyle}>
              <strong>{submission.name}</strong> - {submission.email} <br />
              <p><strong>Message:</strong> {submission.message}</p>
              <p><strong>AI Analysis:</strong> {submission.aiResponse}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No submissions yet.</p>
      )}
    </section>
  );
};

const listStyle = {
  border: "2px solid #444", // Darker border for contrast
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "5px",
  background: "#ffffff", // White background
  color: "#000000" // Black text for high contrast
};


export default FarmSales;
