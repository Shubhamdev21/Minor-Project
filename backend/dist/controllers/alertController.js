"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAlert = exports.resolveAlert = exports.createAlert = exports.getAlerts = void 0;
const Alert_1 = __importDefault(require("../models/Alert"));
const getAlerts = async (req, res) => {
    try {
        const alerts = await Alert_1.default.find({}).sort({ detectedAt: -1 }).limit(50);
        res.json(alerts);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getAlerts = getAlerts;
const createAlert = async (req, res) => {
    try {
        const { sensorId, location, confidence, severity } = req.body;
        const alert = await Alert_1.default.create({
            sensorId,
            location,
            confidence,
            severity,
        });
        res.status(201).json(alert);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.createAlert = createAlert;
const resolveAlert = async (req, res) => {
    try {
        const alert = await Alert_1.default.findById(req.params.id);
        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }
        alert.isResolved = true;
        await alert.save();
        res.json(alert);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.resolveAlert = resolveAlert;
const deleteAlert = async (req, res) => {
    try {
        const alert = await Alert_1.default.findByIdAndDelete(req.params.id);
        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }
        res.json({ message: 'Alert removed' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteAlert = deleteAlert;
