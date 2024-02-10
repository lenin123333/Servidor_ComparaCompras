import express from 'express';
import uploadImagenMiddleware from '../middleware/uploadFile.js';
import { addProduc,addCategory,getsCategory } from '../controller/productController.js';
import checkAuth from '../middleware/checkAuth.js';


const router = express.Router();


router.post('/category',checkAuth,addCategory)
router.get('/category',checkAuth,getsCategory)
router.post('/',checkAuth, uploadImagenMiddleware,addProduc);

export default router;