import React, { useEffect, useState } from "react";

const FarmSales = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Fetch initial submissions
    fetch(`${process.env.REACT_APP_API_URL}/api/submissions`)
      .then((res) => res.json())
      .then((data) => setSubmissions(data))
      .catch((err) => console.error("Error fetching submissions:", err));

    // WebSocket connection
    const ws = new WebSocket(process.env.REACT_APP_WS_URL);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      switch(message.type) {
        case "INITIAL_DATA":
          setSubmissions(message.data);
          break;
        case "NEW_SUBMISSION":
          setSubmissions(prev => [message.data, ...prev]);
          break;
        default:
          console.log("Unknown message type:", message.type);
      }
    };

    return () => {
      ws.close();
    };
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
  border: "2px solid #444",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "5px",
  background: "#ffffff",
  color: "#000000"
};

export default FarmSales;