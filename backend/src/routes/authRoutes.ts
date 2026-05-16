import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { authLimiter } from '../middleware/rateLimiter';
import { validateRequest, registerSchema, loginSchema } from '../validators/authValidator';

const router = express.Router();

router.post('/register', authLimiter, validateRequest(registerSchema), registerUser);
router.post('/login', validateRequest(loginSchema), loginUser);
router.get('/profile', protect, getUserProfile);

export default router;
