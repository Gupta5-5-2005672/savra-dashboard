import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div style={{
      background: "#f4f4f4",
      padding: "20px",
      borderRadius: "10px",
      width: "200px",
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
};

export default StatsCard;