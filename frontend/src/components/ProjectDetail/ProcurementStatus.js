import React from "react";

const ProcurementStatus = ({ project }) => {
  return (
    <div className="procurement-container">
      <h3>Procurement Status</h3>

      <div className="procurement-list">
        <div className="procurement-item">
          <span className="label">Module Delivery</span>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: "35%" }}></div>
            <span className="progress-text">35%</span>
          </div>
        </div>

        <div className="procurement-item">
          <span className="label">Nomicon Impact</span>
          <span className="status">Pending</span>
        </div>

        <div className="procurement-item completed">
          <span className="label">Inverter Delivery</span>
          <span className="status">Completed</span>
        </div>

        <div className="procurement-item">
          <span className="label">BOS Procurement</span>
          <span className="status">Age 10</span>
        </div>

        <div className="procurement-item">
          <span className="label">Construction</span>
          <span className="status">In Progress</span>
        </div>

        <div className="procurement-item completed">
          <span className="label">Civil Works</span>
          <span className="status">Completed</span>
        </div>

        <div className="procurement-item">
          <span className="label">Mounting Structure Processes</span>
          <span className="status">In Progress</span>
        </div>

        <div className="procurement-item">
          <span className="label">Electrical Installation</span>
          <span className="status">Scheduled (Sep 15)</span>
        </div>
      </div>
    </div>
  );
};

export default ProcurementStatus;
