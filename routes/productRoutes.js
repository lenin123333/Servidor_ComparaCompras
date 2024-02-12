import express from 'express';
import uploadImagenMiddleware from '../middleware/uploadFile.js';
import { addProduc,addCategory,getCategorys,addStore,getStores,updateProduc,getProducts } from '../controller/productController.js';
import checkAuth from '../middleware/checkAuth.js';


const router = express.Router();


router.post('/category',checkAuth,addCategory)
router.get('/category',checkAuth,getCategorys)
router.post('/store',checkAuth,addStore)
router.get('/store',checkAuth,getStores)

router.post('/',checkAuth, uploadImagenMiddleware,addProduc);
router.get('/',checkAuth,getProducts);
router.put('/',checkAuth,updateProduc);

export default router;