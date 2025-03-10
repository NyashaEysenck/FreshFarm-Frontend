import React from "react";
import Form from "../components/Form";

const Index = ({ onSubmit }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-2">🌿 Welcome to Fresh Farm</h2>
        <p className="text-gray-600 mb-4">Fill out the form to stay updated with our latest products!</p>
        <Form onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Index;

