import React from 'react';
import '../App.css';
const Failed = () => {
  return (
    <div className="loading-screen">
      <div className="spinner-container">
        <div className="spinner" style={{width: "250px",
  height: "250px",
  borderRadius: "50%",
  border: "20px solid red",
  borderTopColor: " transparent",
  animation: "spin 2s linear infinite",
  position: "relative"
}}></div>
        <p className="text" style={{color:"red"}}>Folder Already Exist</p>
      </div>
    </div>
  );
};
export default Failed;