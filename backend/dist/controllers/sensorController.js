"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSensorStatus = exports.getSensors = void 0;
const SensorLog_1 = __importDefault(require("../models/SensorLog"));
const getSensors = async (req, res) => {
    try {
        // Return the latest status for each unique location
        const sensors = await SensorLog_1.default.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $group: {
                    _id: '$location',
                    status: { $first: '$status' },
                    batteryLevel: { $first: '$batteryLevel' },
                    temperature: { $first: '$temperature' },
                    lastUpdate: { $first: '$createdAt' }
                }
            }
        ]);
        res.json(sensors);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getSensors = getSensors;
const getSensorStatus = async (req, res) => {
    try {
        const logs = await SensorLog_1.default.find({}).sort({ createdAt: -1 }).limit(100);
        res.json(logs);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getSensorStatus = getSensorStatus;
