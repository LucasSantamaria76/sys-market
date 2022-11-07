import { Router } from 'express';
import { ProvidersController } from '../controllers/providers.controllers';
import { verifyToken } from '../middleware';

const router = Router();

router.post('/', verifyToken, ProvidersController.create);
router.get('/', verifyToken, ProvidersController.getAll);
router.get('/:id', verifyToken, ProvidersController.getById);
router.put('/:id', verifyToken, ProvidersController.update);
router.patch('/:id', verifyToken, ProvidersController.addProduct);
router.delete('/:id', verifyToken, ProvidersController.delete);

export default router;
