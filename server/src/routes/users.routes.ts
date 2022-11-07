import { Router } from 'express';
import { verifyToken } from '../middleware';
import { UsersControllers } from './../controllers/users.controllers';

const router = Router();

router.get('/', verifyToken, UsersControllers.getAll);

export default router;
