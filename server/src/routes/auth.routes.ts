import { Router } from 'express';
import { ControllerAuth } from '../controllers/auth.controllers';
import { verifyPassword } from '../middleware';

const router = Router();

router.post('/register', ControllerAuth.register);
router.post('/login', verifyPassword, ControllerAuth.login);

export default router;
