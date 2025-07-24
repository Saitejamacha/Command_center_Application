import React, { useState } from "react";
import axios from "axios";
import {
  FaFlag,
  FaQuestionCircle,
  FaSyncAlt,
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";

const CommunicationHub = ({ updates }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleFlagRisk = (updateId) => {
    // In a real app, this would trigger an API call
    console.log(`Flagging risk for update ${updateId}`);
  };

  const handleClarify = (updateId) => {
    console.log(`Requesting clarification for update ${updateId}`);
  };

  const handleUpdate = (updateId) => {
    console.log(`Updating status for update ${updateId}`);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/updates", {
        project_id: 1, // Default project for demo
        title: "New Update",
        message: newMessage,
        type: "info",
      });
      setNewMessage("");
      // In a real app, you would refresh the updates
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "warning":
        return <FaExclamationTriangle className="warning" />;
      case "error":
        return <FaExclamationTriangle className="error" />;
      case "success":
        return <FaCheckCircle className="success" />;
      default:
        return <FaInfoCircle className="info" />;
    }
  };

  return (
    <div className="communication-hub">
      <h2>Communication Hub</h2>

      <div className="updates-list">
        {updates.map((update) => (
          <div key={update.id} className={`update-item ${update.type}`}>
            <div className="update-header">
              {getTypeIcon(update.type)}
              <h3>{update.title}</h3>
              <span className="time">
                {new Date(update.created_at).toLocaleTimeString()}
              </span>
            </div>
            <p>{update.message}</p>
            <div className="actions">
              <button
                className="action-button flag"
                onClick={() => handleFlagRisk(update.id)}
              >
                <FaFlag /> Flag Risk
              </button>
              <button
                className="action-button clarify"
                onClick={() => handleClarify(update.id)}
              >
                <FaQuestionCircle /> Clarify
              </button>
              <button
                className="action-button update"
                onClick={() => handleUpdate(update.id)}
              >
                <FaSyncAlt /> Update
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="new-message">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Add new update..."
        />
        <button onClick={handleSendMessage}>Send Update</button>
      </div>
    </div>
  );
};

export default CommunicationHub;
