import { Router } from 'express';
import { verifyPassword, verifyToken } from '../middleware';
import { UsersControllers } from './../controllers/users.controllers';

const router = Router();

router.put('/', verifyPassword, verifyToken, UsersControllers.changePassword);
router.patch('/:id', verifyToken, UsersControllers.update);
router.get('/', verifyToken, UsersControllers.getAll);
router.delete('/:id', verifyToken, UsersControllers.delete);

export default router;
