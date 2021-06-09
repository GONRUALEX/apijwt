import { Router } from 'express';
import * as productController  from '../controllers/product.controller'
import {authJwt} from '../middlewares'; 

const router = Router();

router.post('/', [authJwt.verifyToken, authJwt.isModerator], productController.createProduct);

router.get('/',productController.getProduct);

router.get('/:productId',productController.getProductById);

router.put('/:productId',authJwt.verifyToken,productController.updateProductById);

router.delete('/:productId',authJwt.verifyToken,productController.deleteProductById);

export default router;