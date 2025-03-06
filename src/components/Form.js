import React, { useState } from "react";
import "../styles.css";

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          setFormData({ name: "", email: "", message: "" });
          onSubmit(result.data);
        } else {
          alert(result.error);
        }
      } catch (error) {
        alert("Error submitting form.");
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}> {/* Removed role="form" */}
      <h3>Contact Us</h3>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input 
          id="name"
          type="text" 
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          className={errors.name ? "input-error" : ""}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <p id="name-error" className="error-text" aria-live="polite">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input 
          id="email"
          type="email" 
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          className={errors.email ? "input-error" : ""}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error" className="error-text" aria-live="polite">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea 
          id="message"
          value={formData.message} 
          onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
          className={errors.message ? "input-error" : ""}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <p id="message-error" className="error-text" aria-live="polite">{errors.message}</p>}
      </div>

      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default Form;
