"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const database_1 = __importDefault(require("./config/database"));
const errorHandler_1 = require("./middleware/errorHandler");
const rateLimiter_1 = require("./middleware/rateLimiter");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const alertRoutes_1 = __importDefault(require("./routes/alertRoutes"));
const analyticsRoutes_1 = __importDefault(require("./routes/analyticsRoutes"));
const settingsRoutes_1 = __importDefault(require("./routes/settingsRoutes"));
const sensorRoutes_1 = __importDefault(require("./routes/sensorRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || '*',
        methods: ['GET', 'POST']
    }
});
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/api', rateLimiter_1.apiLimiter);
// Database Connection
(0, database_1.default)();
// Routes
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Smart Intruder Alert System API is running' });
});
app.use('/api/auth', authRoutes_1.default);
app.use('/api/alerts', alertRoutes_1.default);
app.use('/api/analytics', analyticsRoutes_1.default);
app.use('/api/settings', settingsRoutes_1.default);
app.use('/api/sensors', sensorRoutes_1.default);
const pirSimulator_1 = require("./simulators/pirSimulator");
const seedData_1 = require("./utils/seedData");
// Start Background Jobs
const startApp = async () => {
    await (0, seedData_1.seedAdminUser)();
    (0, pirSimulator_1.startPirSimulator)();
};
startApp();
// WebSocket Events
exports.io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});
// Error Handling Middleware
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
