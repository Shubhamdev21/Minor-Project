"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeeklyAnalytics = exports.getHourlyAnalytics = void 0;
const Alert_1 = __importDefault(require("../models/Alert"));
const getHourlyAnalytics = async (req, res) => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const alerts = await Alert_1.default.aggregate([
            { $match: { detectedAt: { $gte: twentyFourHoursAgo } } },
            {
                $group: {
                    _id: { $hour: '$detectedAt' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json(alerts);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getHourlyAnalytics = getHourlyAnalytics;
const getWeeklyAnalytics = async (req, res) => {
    try {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const alerts = await Alert_1.default.aggregate([
            { $match: { detectedAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dayOfWeek: '$detectedAt' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json(alerts);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getWeeklyAnalytics = getWeeklyAnalytics;
