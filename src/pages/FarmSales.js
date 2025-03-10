import React, { useEffect, useState } from "react";

const FarmSales = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/submissions`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setSubmissions(data);
      } catch (err) {
        setError("Error fetching submissions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();

    // WebSocket connection
    const ws = new WebSocket(process.env.REACT_APP_WS_URL);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "NEW_SUBMISSION") {
        setSubmissions((prev) => [message.data, ...prev]);
      }
    };

    ws.onerror = () => setError("WebSocket error.");
    ws.onclose = () => console.log("WebSocket closed.");

    return () => ws.close();
  }, []);

  return (
    <section className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Farm Sales Data</h2>

      {loading ? (
        <p className="text-gray-600">Loading submissions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : submissions.length > 0 ? (
        <ul className="space-y-4">
          {submissions.map((submission, index) => (
            <li key={index} className="border border-gray-300 bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-800">{submission.name} - {submission.email}</p>
              <p className="text-gray-600"><strong>Message:</strong> {submission.message}</p>
              <p className="text-green-700"><strong>AI Analysis:</strong> {submission.aiResponse}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No submissions yet.</p>
      )}
    </section>
  );
};

export default FarmSales;
