import React from "react";

const TestingCommissioning = ({ project }) => {
  return (
    <div className="testing-container">
      <h3>Testing & Commissioning</h3>

      <div className="timeline">
        <div className="timeline-item delayed">
          <div className="timeline-content">
            <h4>Pre-commissioning</h4>
            <p>A Delay in Module</p>
            <span className="status">Delayed</span>
          </div>
        </div>

        <div className="timeline-item upcoming">
          <div className="timeline-content">
            <h4>Grid Sync</h4>
            <p>Scheduled for Oct 5</p>
            <span className="status">Upcoming</span>
          </div>
        </div>

        <div className="timeline-item upcoming">
          <div className="timeline-content">
            <h4>Final Acceptance</h4>
            <p>1% Complete, Target Oct 15</p>
            <span className="status">Upcoming</span>
          </div>
        </div>
      </div>

      <div className="construction-status">
        <h4>Construction Status</h4>
        <ul>
          <li className="completed">Civil Works (Completed)</li>
          <li>Mounting Structure Processes (In Progress)</li>
          <li>Electrical Installation (Scheduled for Sep 15)</li>
        </ul>
      </div>
    </div>
  );
};

export default TestingCommissioning;
