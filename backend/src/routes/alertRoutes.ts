import express from 'express';
import { getAlerts, createAlert, resolveAlert, deleteAlert } from '../controllers/alertController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getAlerts)
  .post(protect, createAlert); // or could be an internal API only

router.route('/:id')
  .delete(protect, admin, deleteAlert);

router.route('/:id/resolve')
  .patch(protect, resolveAlert);

export default router;
