# Smart Intruder Alert System

A full-stack IoT-based security monitoring system that simulates a PIR motion sensor and provides real-time intrusion detection, live dashboard monitoring, and instant Telegram notifications.

The system is designed to demonstrate the integration of sensors, actuators, APIs, WebSockets, cloud communication, and real-time monitoring using modern web technologies.

---

# Project Overview

The Smart Intruder Alert System is a security-focused IoT application that detects motion activity and instantly alerts users through a live dashboard and Telegram notifications.

The project simulates a real smart surveillance system where motion events are generated, processed by the backend server, stored in the database, and broadcast to connected clients in real time.

---

# Main Objectives

* Real-time motion detection monitoring
* Instant intrusion alerts
* Telegram bot notification system
* Sensor simulation using APIs
* Real-time WebSocket communication
* Dashboard analytics and alert history
* Modern responsive user interface

---

# System Architecture

```text id="nl28bs"
┌──────────────────┐
│  PIR Simulator   │
│ Motion Detection │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Backend API    │
│ Node.js/Express  │
└────────┬─────────┘
         │
 ┌───────┼────────┐
 ▼                ▼
Database      WebSocket Server
MongoDB       Socket.io
 │                │
 ▼                ▼
Alert Logs    Live Dashboard
                   │
                   ▼
            Telegram Bot Alerts
```

---

# Features

## Real-Time Monitoring

* Live motion detection updates
* WebSocket-based real-time dashboard
* Instant UI updates without refresh

## Motion Sensor Simulation

* Simulated PIR motion events
* Random detection intervals
* Multiple virtual locations

## Telegram Notifications

* Instant intrusion alerts
* Telegram Bot API integration
* Real-time notification delivery

## Dashboard Analytics

* Motion activity charts
* Alert history tracking
* Detection analytics using Recharts

## Authentication System

* JWT-based authentication
* Protected dashboard routes
* Secure login system

## Modern UI/UX

* Responsive design
* Framer Motion animations
* TailwindCSS + shadcn/ui components
* Dark themed dashboard

---

# Technologies Used

## Frontend

* Next.js 14
* TypeScript
* TailwindCSS
* shadcn/ui
* Framer Motion
* Zustand
* Axios
* Socket.io Client
* Recharts

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.io
* JWT Authentication
* Winston Logger

## Integrations

* Telegram Bot API
* WebSockets
* REST APIs
* Docker

---

# System Workflow

## Step 1: Motion Detection

The PIR simulator generates motion events.

## Step 2: Backend Processing

The backend receives motion data through APIs.

## Step 3: Database Storage

Alert data is stored in MongoDB.

## Step 4: Real-Time Broadcasting

Motion events are broadcast using Socket.io.

## Step 5: Dashboard Update

Connected users receive live updates instantly.

## Step 6: Telegram Alert

A Telegram notification is sent to the user.

---

# Dashboard Features

* Live motion status
* Active sensor indicators
* Alert history table
* Real-time charts
* Notification system
* Analytics dashboard

---

# Telegram Integration

The project integrates Telegram Bot API for real-time intrusion notifications.

Example alert:

```text id="1ffqyy"
INTRUDER ALERT

Motion Detected
Location: Front Door
Time: 10:45 PM
Severity: HIGH
```

---

# Project Structure

```text id="v5jkg4"
smart-intruder-alert/
│
├── frontend/
├── backend/
├── docker/
├── docs/
├── README.md
└── docker-compose.yml
```

---

# Setup Instructions

## Environment Variables

Check `.env.example` for all required variables.

Example:

```env id="xiebdq"
MONGODB_URI=
JWT_SECRET=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SOCKET_URL=
```

---

# Local Development

## Backend Setup

```bash id="s8vqfq"
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```bash id="9ecldu"
cd frontend
npm install
npm run dev
```

---

# Docker Setup

To run the complete stack locally:

```bash id="8jlwmg"
docker-compose up --build
```

This starts:

* MongoDB
* Backend Server
* Frontend Application

---

# Application URLs

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:5000 |

---

# Deployment

## Frontend Deployment (Vercel)

1. Push repository to GitHub
2. Import project into Vercel
3. Configure environment variables
4. Deploy application

---

## Backend Deployment (Render/Railway)

1. Connect GitHub repository
2. Configure build command:

```bash id="1ns8df"
npm install && npm run build
```

3. Configure start command:

```bash id="o7d83t"
npm start
```

4. Add environment variables

---

## Database Deployment (MongoDB Atlas)

1. Create free MongoDB Atlas cluster
2. Configure IP whitelist
3. Get connection string
4. Add `MONGODB_URI`

---

# Security Features

* JWT Authentication
* Protected Routes
* Secure API Validation
* Environment Variable Protection
* Error Handling Middleware

---

# Future Enhancements

* Real PIR sensor hardware integration
* Camera surveillance support
* AI-based threat detection
* Mobile application
* Push notifications
* Cloud analytics dashboard

---

# Learning Outcomes

This project helped in understanding:

* IoT architecture
* Real-time systems
* WebSockets
* Full-stack development
* Telegram Bot API
* Authentication systems
* Sensor integration concepts
* Dashboard analytics



# Developed By

Shubham Dev Behera


B.Tech Information Technology


This project is developed for educational and academic purposes.
