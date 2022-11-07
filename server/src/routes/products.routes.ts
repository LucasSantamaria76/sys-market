import { Router } from 'express';
import { ProductsController } from '../controllers/products.controllers';
import { verifyToken } from '../middleware';

const router = Router();

router.post('/', verifyToken, ProductsController.create);
router.get('/', verifyToken, ProductsController.getAll);
router.get('/ProdByProv', verifyToken, ProductsController.getProductsByProvider);
router.get('/:barcode', verifyToken, ProductsController.getByBarcode);
router.put('/:barcode', verifyToken, ProductsController.update);
router.patch('/:id', verifyToken, ProductsController.updateStock);
router.delete('/:barcode', verifyToken, ProductsController.delete);

export default router;
