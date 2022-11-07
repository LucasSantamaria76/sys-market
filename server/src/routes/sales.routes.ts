import { Router } from 'express';
import { verifyToken } from '../middleware';
import { SalesControllers } from './../controllers/sales.controllers';

const router = Router();

router.post('/', verifyToken, SalesControllers.create);
router.get('/', verifyToken, SalesControllers.getAll);

export default router;
