import express from 'express';
import {
    addProduct,
    getShoopingCart,
    amountProduct,
    descountProduct
} from '../controller/shoppingCartController.js';
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();


//Rutas Usuarios,Autenticacion,Creacion, Registro y Confirmacion de Usuarios
router.post('/',checkAuth,addProduct)
router.get('/',checkAuth,getShoopingCart)
router.post('/amount',checkAuth,amountProduct)
router.post('/descount',checkAuth,descountProduct)


export default router