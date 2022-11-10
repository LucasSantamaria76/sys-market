import { Router } from 'express';
import { ProvidersController } from '../controllers/providers.controllers';
import { verifyToken } from '../middleware';

const router = Router();

router.use(verifyToken);

router.post('/', ProvidersController.create);
router.get('/', ProvidersController.getAll);
router.get('/:id', ProvidersController.getById);
router.put('/:id', ProvidersController.update);
router.patch('/:id', ProvidersController.addProduct);
router.delete('/:id', ProvidersController.delete);

export default router;
