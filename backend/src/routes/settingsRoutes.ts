import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getSettings)
  .patch(protect, updateSettings);

export default router;
