# Smart Intruder Alert System

A modern IoT-inspired security monitoring system that simulates a PIR motion sensor using APIs and provides real-time motion detection, instant Telegram alerts, and live dashboard monitoring.

## Features
- Real-time motion detection dashboard with WebSocket
- Sensor simulator
- Telegram Bot Notifications
- Animated UI with Framer Motion and shadcn/ui
- Analytics and Charts using Recharts
- Authentication with JWT

## Technologies Used
**Frontend**: Next.js 14, TailwindCSS, shadcn/ui, Zustand, Socket.io-client, Axios, Framer Motion
**Backend**: Node.js, Express, MongoDB (Mongoose), Socket.io, JWT, Winston Logger

## Setup Instructions

### Environment Variables
Check `.env.example` to see the required variables.

### Local Development (Without Docker)

1. **Backend**:
```bash
cd backend
npm install
npm run dev
```

2. **Frontend**:
```bash
cd frontend
npm install
npm run dev
```

### Docker Setup
To run the entire stack locally using Docker Compose:
```bash
docker-compose up --build
```
This will start MongoDB, Backend (Port 5000), and Frontend (Port 3000).

## Deployment

### Frontend (Vercel)
1. Push your repository to GitHub.
2. Import project into Vercel.
3. Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SOCKET_URL`.

### Backend (Render/Railway)
1. Connect GitHub to Render.
2. Choose Web Service and select the `backend` folder.
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Set the required Environment Variables.

### Database (MongoDB Atlas)
1. Create a free cluster on MongoDB Atlas.
2. Whitelist your backend IP.
3. Get the connection string and set it as `MONGODB_URI`.
