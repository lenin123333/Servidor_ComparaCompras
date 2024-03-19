import express from 'express';
import {
    addProduct,
    getShoopingCart,
    amountProduct,
    descountProduct,
    saveShoopingCart,
    showShoopingCart,
    getShoopingCartById,
    deleteShoopingCartById,
    saveShoopingCartById
} from '../controller/shoppingCartController.js';
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();


//Rutas Usuarios,Autenticacion,Creacion, Registro y Confirmacion de Usuarios
router.post('/',checkAuth,addProduct)
router.get('/',checkAuth,getShoopingCart)
router.post('/amount',checkAuth,amountProduct)
router.post('/descount',checkAuth,descountProduct)
router.get('/save',checkAuth,saveShoopingCart)
router.get('/save/:id',checkAuth,saveShoopingCartById)
router.post('/show',checkAuth,showShoopingCart)
router.post('/detele',checkAuth,deleteShoopingCartById)
router.get('/:id',checkAuth,getShoopingCartById)

export default router