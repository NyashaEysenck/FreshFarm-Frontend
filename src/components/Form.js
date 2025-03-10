import React, { useState } from "react";

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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/submissions`, {
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
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h3 className="text-2xl font-bold text-center text-gray-700 mb-4">Contact Us</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-600 font-medium">Name:</label>
          <input 
            id="name"
            type="text" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            className={`w-full border rounded-lg p-2 focus:ring focus:ring-green-300 ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-600 font-medium">Email:</label>
          <input 
            id="email"
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            className={`w-full border rounded-lg p-2 focus:ring focus:ring-green-300 ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-600 font-medium">Message:</label>
          <textarea 
            id="message"
            value={formData.message} 
            onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
            className={`w-full border rounded-lg p-2 h-32 resize-none focus:ring focus:ring-green-300 ${errors.message ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">Submit</button>
      </form>
    </div>
  );
};

export default Form;
