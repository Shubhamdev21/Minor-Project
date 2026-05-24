"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sensorController_1 = require("../controllers/sensorController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.protect, sensorController_1.getSensors);
router.get('/status', authMiddleware_1.protect, sensorController_1.getSensorStatus);
exports.default = router;
