"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPirSimulator = void 0;
const server_1 = require("../server");
const Alert_1 = __importDefault(require("../models/Alert"));
const SensorLog_1 = __importDefault(require("../models/SensorLog"));
const Settings_1 = __importDefault(require("../models/Settings"));
const telegramService_1 = require("../services/telegramService");
const LOCATIONS = ['Front Door', 'Back Door', 'Living Room', 'Garage', 'Balcony', 'Hallway'];
const startPirSimulator = () => {
    setInterval(async () => {
        try {
            const settings = await Settings_1.default.findOne();
            if (settings && !settings.simulationMode) {
                return; // Skip if simulation is disabled
            }
            // Trigger motion every time (100% chance)
            if (true) {
                const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
                const confidence = Math.floor(Math.random() * 20) + 80; // 80-100%
                const severity = confidence > 90 ? 'HIGH' : confidence > 85 ? 'MEDIUM' : 'LOW';
                // 1. Create Alert
                const alert = await Alert_1.default.create({
                    sensorId: `PIR_${location.replace(' ', '_').toUpperCase()}`,
                    location,
                    confidence,
                    severity,
                    detectedAt: new Date(),
                });
                // 2. Create Sensor Log
                await SensorLog_1.default.create({
                    status: 'MOTION_DETECTED',
                    location,
                    batteryLevel: Math.floor(Math.random() * 20) + 80,
                    temperature: Math.floor(Math.random() * 15) + 15,
                });
                // 3. Emit via WebSocket
                server_1.io.emit('motion_detected', {
                    alertId: alert._id,
                    location,
                    confidence,
                    severity,
                    detectedAt: alert.detectedAt,
                });
                console.log(`[SIMULATOR] Scheduled Alert triggered at ${location} (Every 30s)`);
                if (severity === 'HIGH' || severity === 'MEDIUM') {
                    await (0, telegramService_1.sendTelegramAlert)(location, confidence, severity);
                }
            }
        }
        catch (error) {
            console.error('Simulator Error:', error);
        }
    }, 30000); // Trigger exactly every 30 seconds
};
exports.startPirSimulator = startPirSimulator;
/*
 Every 30s
    ↓
 Is simulation ON?  →  NO → Do nothing
    ↓ YES
 Pick random location (e.g. "Garage")
    ↓
 Generate confidence score (e.g. 94%)
    ↓
 Severity = HIGH
    ↓
 Save Alert to DB
 Save Sensor Log to DB📡 Send live update to website (WebSocket)
 Send Telegram message
*/ 
