import { Router } from 'express';
import { SalesControllers } from './../controllers/sales.controllers';

const router = Router();

router.post('/', SalesControllers.create);
router.get('/', SalesControllers.getAll);

export default router;
