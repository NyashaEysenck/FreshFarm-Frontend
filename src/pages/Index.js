import React from "react";
import Form from "../components/Form";

const Index = ({ onSubmit }) => {
  return (
    <div className="index-container">
      <div className="index-card">
        <h2>🌿 Welcome to Fresh Farm</h2>
        <p>Fill out the form to stay updated with our latest products!</p>
        <Form onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Index;
