import { Router } from 'express';
import { verifyToken } from '../middleware';
import { PurchasesControllers } from './../controllers/purchases.controllers';

const router = Router();

router.use(verifyToken);
router.route('/').get(PurchasesControllers.getAll).post(PurchasesControllers.create);

export default router;
