import express from 'express';
import { getHourlyAnalytics, getWeeklyAnalytics } from '../controllers/analyticsController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/hourly', protect, getHourlyAnalytics);
router.get('/weekly', protect, getWeeklyAnalytics);

export default router;
