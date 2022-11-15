import { Router } from 'express';
import { CashOutsControler } from '../controllers/cashOuts.controlers';
import { verifyToken } from '../middleware';

const router = Router();
router.use(verifyToken);
router.route('/').get(CashOutsControler.getAll);
router.route('/').post(CashOutsControler.create);
router.route('/totalPerDay').get(CashOutsControler.getTotalPerDay);

export default router;
