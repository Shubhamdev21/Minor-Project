# Smart Intruder Alert System

A full-stack IoT-based security monitoring system that simulates a PIR motion sensor and provides real-time intrusion detection, live dashboard monitoring, and instant Telegram notifications.

## Project Overview

The Smart Intruder Alert System is a security-focused IoT application that detects motion activity and instantly alerts users through a live dashboard and Telegram notifications.

## Main Objectives

- Real-time motion detection monitoring
- Instant intrusion alerts
- Telegram bot notification system
- Sensor simulation using APIs
- Real-time WebSocket communication
- Dashboard analytics and alert history
- Modern responsive user interface

## System Architecture
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

## Technologies Used

### Frontend
- Next.js 14, TypeScript, TailwindCSS
- shadcn/ui, Framer Motion, Zustand
- Axios, Socket.io Client, Recharts

### Backend
- Node.js, Express.js, MongoDB, Mongoose
- Socket.io, JWT Authentication, Winston Logger

### Integrations
- Telegram Bot API, WebSockets, REST APIs, Docker

## Setup Instructions

### Environment Variables
Create a `.env` file in the backend folder:
MONGODB_URI=
JWT_SECRET=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
PORT=5000

### Local Development

Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

### Docker Setup
```bash
docker-compose up --build
```

## Application URLs

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:5000 |

## Security Features

- JWT Authentication
- Protected Routes
- Secure API Validation
- Environment Variable Protection
- Error Handling Middleware

## Future Enhancements

- Real PIR sensor hardware integration
- Camera surveillance support
- AI-based threat detection
- Mobile application
- Push notifications

## Developed By

**Shubham Dev Behera**
B.Tech Information Technology

*This project is developed for educational and academic purposes.*
