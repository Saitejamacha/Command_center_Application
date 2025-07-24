import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import ProjectDetail from "./components/ProjectDetail";
import Sidebar from "./components/Sidebar";
import "./components/styles/main.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
        if (response.data.length > 0) {
          setSelectedProject(response.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Sidebar projects={projects} selectedProject={selectedProject} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard projects={projects} />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
