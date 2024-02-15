import express from 'express';
import {
    addProduct
} from '../controller/shoppingCartController.js';
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();


//Rutas Usuarios,Autenticacion,Creacion, Registro y Confirmacion de Usuarios
router.post('/',checkAuth,addProduct)

export default router