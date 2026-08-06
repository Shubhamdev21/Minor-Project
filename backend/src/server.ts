import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { Server } from "socket.io";
import connectDB from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import { apiLimiter } from "./middleware/rateLimiter";
import authRoutes from "./routes/authRoutes";
import alertRoutes from "./routes/alertRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import settingsRoutes from "./routes/settingsRoutes";
import sensorRoutes from "./routes/sensorRoutes";
import subscriberRoutes from "./routes/subscriber.routes";

dotenv.config();

const app = express();
const server = http.createServer(app);


export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api", apiLimiter);

connectDB();

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Smart Intruder Alert System API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/subscribers", subscriberRoutes);

import { startPirSimulator } from "./simulators/pirSimulator";
import { seedAdminUser } from "./utils/seedData";

const startApp = async () => {
  await seedAdminUser();
  startPirSimulator();
};
startApp();

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
