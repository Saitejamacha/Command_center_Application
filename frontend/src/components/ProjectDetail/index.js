import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProjectSchematic from "./ProjectSchematic";
import ProcurementStatus from "./ProcurementStatus";
import TestingCommissioning from "./TestingCommissioning";
import "./index.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [sites, setSites] = useState([]);
  const [activeTab, setActiveTab] = useState("schematic");

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectRes = await axios.get(
          `http://localhost:5000/api/projects/${id}`
        );
        const sitesRes = await axios.get(
          `http://localhost:5000/api/projects/${id}/sites`
        );

        setProject(projectRes.data);
        setSites(sitesRes.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-detail">
      <h1>{project.name}</h1>

      <div className="tabs">
        <button
          className={activeTab === "schematic" ? "active" : ""}
          onClick={() => setActiveTab("schematic")}
        >
          Project Schematic
        </button>
        <button
          className={activeTab === "procurement" ? "active" : ""}
          onClick={() => setActiveTab("procurement")}
        >
          Procurement
        </button>
        <button
          className={activeTab === "testing" ? "active" : ""}
          onClick={() => setActiveTab("testing")}
        >
          Testing & Commissioning
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "schematic" && (
          <ProjectSchematic project={project} sites={sites} />
        )}
        {activeTab === "procurement" && <ProcurementStatus project={project} />}
        {activeTab === "testing" && <TestingCommissioning project={project} />}
      </div>
    </div>
  );
};

export default ProjectDetail;
