import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="project-card" onClick={handleClick}>
      <div className="project-header">
        <h3>{project.name}</h3>
        <span className="location">{project.location}</span>
      </div>

      <div className="progress-container">
        <div className="progress-info">
          <span>Progress </span>
          <span style={{ marginLeft: "10px" }}>{project.progress}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="project-details">
        <div className="detail-item">
          <span className="label">Capacity</span>
          <span className="value">{project.capacity}</span>
        </div>
        <div className="detail-item">
          <span className="label">Planned</span>
          <span className="value">{project.planned_capacity}</span>
        </div>
        <div className="detail-item">
          <span className="label">Variance</span>
          <span className="value positive">+15%</span>
        </div>
      </div>

      <div className="project-status">
        {project.progress === 100 ? (
          <span className="status completed">Completed</span>
        ) : project.progress > 75 ? (
          <span className="status on-track">On Track</span>
        ) : project.progress > 50 ? (
          <span className="status in-progress">In Progress</span>
        ) : (
          <span className="status delayed">Delayed</span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
