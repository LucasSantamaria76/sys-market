import { Router } from 'express';
import { verifyToken } from '../middleware';
import { PurchasesControllers } from './../controllers/purchases.controllers';

const router = Router();

router.post('/', PurchasesControllers.create);
router.get('/', PurchasesControllers.getAll);

export default router;
