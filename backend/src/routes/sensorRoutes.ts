import express from 'express';
import { getSensors, getSensorStatus } from '../controllers/sensorController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getSensors);
router.get('/status', protect, getSensorStatus);

export default router;
