import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ProjectCard from "./ProjectCard";
import CommunicationHub from "./CommunicationHub";
import ActionCenter from "./ActionCenter";
import "./index.css";

const Dashboard = ({ projects }) => {
  const [mapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [weather, setWeather] = useState({
    temp: "23°C",
    wind: "12km/h",
    condition: "Clear",
  });
  const [updates, setUpdates] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // For demo, we'll just get data for the first project
        if (projects.length > 0) {
          const updatesRes = await axios.get(
            `http://localhost:5000/api/projects/${projects[0].id}/updates`
          );
          const tasksRes = await axios.get(
            `http://localhost:5000/api/projects/${projects[0].id}/tasks`
          );
          const risksRes = await axios.get(
            `http://localhost:5000/api/projects/${projects[0].id}/risks`
          );

          setUpdates(updatesRes.data);
          setTasks(tasksRes.data);
          setRisks(risksRes.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [projects]);

  return (
    <div className="dashboard">
      <h1>Daily Site Briefing - Maharashtra Solar Network</h1>

      <div className="dashboard-grid">
        <div className="map-section">
          <h2>Network Overview</h2>
          <div className="map-container">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={mapCenter}
                zoom={5}
              >
                {projects.map((project) => (
                  <Marker
                    key={project.id}
                    position={{
                      lat: project.lat || mapCenter.lat,
                      lng: project.lng || mapCenter.lng,
                    }}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
          <div className="weather-info">
            <span>Weather: {weather.condition}</span>
            <span>Temp: {weather.temp}</span>
            <span>Wind: {weather.wind}</span>
          </div>
        </div>

        <div className="projects-section">
          <h2>Projects</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div className="communication-section">
          <CommunicationHub updates={updates} />
        </div>

        <div className="action-section">
          <ActionCenter tasks={tasks} risks={risks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
