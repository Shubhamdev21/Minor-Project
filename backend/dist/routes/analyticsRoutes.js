"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analyticsController_1 = require("../controllers/analyticsController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/hourly', authMiddleware_1.protect, analyticsController_1.getHourlyAnalytics);
router.get('/weekly', authMiddleware_1.protect, analyticsController_1.getWeeklyAnalytics);
exports.default = router;
