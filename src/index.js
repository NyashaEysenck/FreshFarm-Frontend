import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/serviceWorker.js")
      .then((registration) => console.log("Service Worker registered:", registration))
      .catch((error) => console.error("Service Worker registration failed:", error));
  });
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

 