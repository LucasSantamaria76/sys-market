import { Router } from 'express';
import { verifyToken } from '../middleware';
import { SalesControllers } from './../controllers/sales.controllers';

const router = Router();
router.use(verifyToken);
router.post('/', SalesControllers.create);
router.get('/', SalesControllers.getAll);

export default router;
