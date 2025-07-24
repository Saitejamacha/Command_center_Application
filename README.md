# Alfred Command Center - Project Management Dashboard

## Overview

A full-stack web application mimicking the "Alfred" Command Center interface for project management and monitoring of construction/solar network projects. This dashboard provides:

**1. Real-time Project Visualization**

- Interactive project maps and progress tracking
- Status indicators for all active sites

**2. Communication Hub**

- Live updates with timestamped notifications
- Actionable messages (Flag Risk/Clarify/Update)
- Color-coded alert system (info/warning/error/success)

**3. Dynamic Action Management**

- Editable task items with priority levels
- Progress tracking with percentage completion
- Due date monitoring and alerts

**4. Critical Risk Register**

- Real-time risk identification and logging
- Customizable risk status (New/Monitoring/Resolved)
- Priority assignment (High/Medium/Low)
- Risk resolution tracking

**5. Project Monitoring**

- Procurement status tracking
- Testing & commissioning timelines
- Automated progress reporting

Implmented features a responsive interface with dark theme styling, database-backed persistence, and REST API endpoints for all core functionality. Designed for solar/construction project teams needing centralized command-and-control capabilities.

## Tech Stack

### Frontend

- React - Component-based UI development
- Material-UI - UI components and icons
- React Google Maps API without API Key - Project location visualization
- Axios - HTTP client for API calls

### Backend

- Node.js - JavaScript runtime
- Express- Web application framework
- MySQL - Relational database

### Development Tools

- npm - Package management
- dotenv - Environment variables
- CORS - Cross-origin resource sharing

## Features

- **Project Dashboard**

  - Overview of all projects with progress indicators
  - Google Maps without API Key integration showing project locations
  - Weather information display

- **Project Detail View**

  - Tabbed interface for different project aspects
  - Project schematic with status indicators
  - Procurement status tracking
  - Testing & commissioning timeline

- **Communication Hub**

  - Real-time updates with timestamps
  - Action buttons (Flag Risk, Clarify, Update)
  - Color-coded message types

- **Action Center**
  - Priority tasks with due dates
  - Critical risk register
  - Status indicators and update controls

## Database Schema alfred_command_center

The application uses MySQL with the following tables:

-- Projects table
CREATE TABLE projects (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
location VARCHAR(255) NOT NULL,
capacity VARCHAR(50) NOT NULL,
progress INT DEFAULT 0,
planned_capacity VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Project Sites
CREATE TABLE project_sites (
id INT AUTO_INCREMENT PRIMARY KEY,
project_id INT NOT NULL,
name VARCHAR(255) NOT NULL,
location VARCHAR(255) NOT NULL,
status VARCHAR(50) NOT NULL,
FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Tasks
CREATE TABLE tasks (
id INT AUTO_INCREMENT PRIMARY KEY,
project_id INT NOT NULL,
title VARCHAR(255) NOT NULL,
description TEXT,
status VARCHAR(50) NOT NULL,
progress INT DEFAULT 0,
due_date DATETIME,
priority ENUM('low', 'medium', 'high') NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Updates
CREATE TABLE updates (
id INT AUTO_INCREMENT PRIMARY KEY,
project_id INT NOT NULL,
title VARCHAR(255) NOT NULL,
message TEXT NOT NULL,
type ENUM('info', 'warning', 'error', 'success') NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Risks
CREATE TABLE risks (
id INT AUTO_INCREMENT PRIMARY KEY,
project_id INT NOT NULL,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
status ENUM('new', 'monitoring', 'resolved') NOT NULL,
priority ENUM('low', 'medium', 'high') NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

### Clone the Repository

git clone https://github.com/Saitejamacha/Command_center_Application
