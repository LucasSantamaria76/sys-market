import { Router } from 'express';
import { verifyToken } from '../middleware';
import { UsersControllers } from './../controllers/users.controllers';

const router = Router();

router.use(verifyToken);
router.get('/', UsersControllers.getAll);
router.delete('/:id', UsersControllers.delete);
router.put('/:id', UsersControllers.update);

export default router;
