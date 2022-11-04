import { Router } from 'express';
import { ProductsController } from '../controllers/products.controllers';

const router = Router();

router.post('/', ProductsController.create);
router.get('/', ProductsController.getAll);
router.get('/ProdByProv', ProductsController.getProductsByProvider);
router.get('/:barcode', ProductsController.getByBarcode);
router.put('/:barcode', ProductsController.update);
router.patch('/:id', ProductsController.updateStock);
router.delete('/:barcode', ProductsController.delete);

export default router;
