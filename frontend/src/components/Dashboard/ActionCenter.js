import React, { useState } from "react";
import axios from "axios";
import {
  FaExclamationTriangle,
  FaFlag,
  FaCheck,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";

const ActionCenter = ({ tasks, risks }) => {
  const [activeTab, setActiveTab] = useState("tasks");

  const handleTaskUpdate = async (taskId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status });
      // In a real app, you would refresh the tasks
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleRiskUpdate = async (riskId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/risks/${riskId}`, { status });
      // In a real app, you would refresh the risks
    } catch (error) {
      console.error("Error updating risk:", error);
    }
  };

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="action-center">
      <div className="tabs">
        <button
          className={activeTab === "tasks" ? "active" : ""}
          onClick={() => setActiveTab("tasks")}
        >
          Action Items
        </button>
        <button
          className={activeTab === "risks" ? "active" : ""}
          onClick={() => setActiveTab("risks")}
        >
          Critical Risk Register
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "tasks" && (
          <div className="tasks-list">
            <h3>Immediate Action Required</h3>
            {tasks
              .filter((task) => task.priority === "high")
              .map((task) => (
                <div key={task.id} className={`action-item ${task.priority}`}>
                  <div className="action-header">
                    <FaExclamationTriangle />
                    <h4>{task.title}</h4>
                    <span className="due">
                      Due: {formatDueDate(task.due_date)}
                    </span>
                  </div>
                  <p>{task.description}</p>
                  <div className="action-actions">
                    <button
                      onClick={() => handleTaskUpdate(task.id, "in-progress")}
                    >
                      <FaClock /> Mark In Progress
                    </button>
                    <button
                      onClick={() => handleTaskUpdate(task.id, "completed")}
                    >
                      <FaCheck /> Complete
                    </button>
                  </div>
                </div>
              ))}

            <h3>Other Tasks</h3>
            {tasks
              .filter((task) => task.priority !== "high")
              .map((task) => (
                <div key={task.id} className={`action-item ${task.priority}`}>
                  <div className="action-header">
                    {task.priority === "medium" ? <FaFlag /> : <FaInfoCircle />}
                    <h4>{task.title}</h4>
                    <span className="due">
                      Due: {formatDueDate(task.due_date)}
                    </span>
                  </div>
                  <p>{task.description}</p>
                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                    <span className="progress-text">{task.progress}%</span>
                  </div>
                </div>
              ))}
          </div>
        )}

        {activeTab === "risks" && (
          <div className="risks-list">
            {risks.map((risk) => (
              <div key={risk.id} className={`risk-item ${risk.priority}`}>
                <div className="risk-header">
                  <FaExclamationTriangle />
                  <h4>{risk.title}</h4>
                  <span className="status">{risk.status}</span>
                </div>
                <p>{risk.description}</p>
                <div className="risk-actions">
                  <select
                    value={risk.status}
                    onChange={(e) => handleRiskUpdate(risk.id, e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="monitoring">Monitoring</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionCenter;
