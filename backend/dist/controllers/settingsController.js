"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const Settings_1 = __importDefault(require("../models/Settings"));
const getSettings = async (req, res) => {
    try {
        let settings = await Settings_1.default.findOne();
        if (!settings) {
            settings = await Settings_1.default.create({});
        }
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        const telegramConfigured = Boolean(token && chatId);
        const telegramEnvIssues = telegramConfigured
            ? null
            : [
                !token ? 'Missing TELEGRAM_BOT_TOKEN' : null,
                !chatId ? 'Missing TELEGRAM_CHAT_ID' : null,
            ]
                .filter(Boolean)
                .join('; ');
        res.json({
            telegramEnabled: settings.telegramEnabled,
            buzzerEnabled: settings.buzzerEnabled,
            detectionSensitivity: settings.detectionSensitivity,
            simulationMode: settings.simulationMode,
            telegramConfigured,
            telegramEnvIssues,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getSettings = getSettings;
const updateSettings = async (req, res) => {
    try {
        let settings = await Settings_1.default.findOne();
        if (!settings) {
            settings = await Settings_1.default.create({});
        }
        const { telegramEnabled, buzzerEnabled, detectionSensitivity, simulationMode } = req.body;
        settings.telegramEnabled = telegramEnabled ?? settings.telegramEnabled;
        settings.buzzerEnabled = buzzerEnabled ?? settings.buzzerEnabled;
        settings.detectionSensitivity = detectionSensitivity ?? settings.detectionSensitivity;
        settings.simulationMode = simulationMode ?? settings.simulationMode;
        await settings.save();
        res.json(settings);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateSettings = updateSettings;
