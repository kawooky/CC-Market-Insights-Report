import React from "react";
import "./ManualPieChart.css";

function ManualPieChart({ percentageMale, percentageFemale }) {
  return (
    <div className="pie-div">
      <div className="pie-chart-container">
        <div className="pie-chart">
          <div
            className="pie-chart-segment"
            style={{
              background: `conic-gradient(#ff6c6c ${percentageMale}%, #ffa4a4 ${percentageMale}% ${percentageFemale}%)`,
              position: "relative",
            }}
          >
            <div className="white-circle"></div>
          </div>
        </div>
      </div>

      <ul className="pie-key">
        <li>
          <div className="key-line">
            <p>Male</p> <p className="percentage">{percentageMale}%</p>
          </div>
        </li>
        <li>
          <div className="key-line">
            <p>Female</p> <p className="percentage"> {percentageFemale}%</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ManualPieChart;
