import React from "react";
import { Link } from "react-router-dom";
import {
  FaSolarPanel,
  FaMapMarkerAlt,
  FaTasks,
  FaExclamationTriangle,
} from "react-icons/fa";

const Sidebar = ({ projects, selectedProject }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>ALFRED</h1>
        <h2>Command Centre</h2>
      </div>

      <div className="sidebar-section">
        <h3>Reporting & Compliance</h3>
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              className={selectedProject === project.id ? "active" : ""}
            >
              <Link to={`/project/${project.id}`}>
                <FaSolarPanel /> {project.name} - {project.location}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Navigation</h3>
        <ul>
          <li>
            <Link to="/">
              <FaMapMarkerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaTasks /> Tasks
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaExclamationTriangle /> Risks
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
