import express from 'express';
import {
    register,
    authenticate,
    confirm,
    forgotPassword,
    chekToken,
    profile,
    newPassword
} from '../controller/userController.js';
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();


//Rutas Usuarios,Autenticacion,Creacion, Registro y Confirmacion de Usuarios

router.post('/', register)//Crea un usuario nuevo
router.post('/login', authenticate)//Crea un usuario nuevo
router.get('/confirm/:token', confirm)//Crea un usuario nuevo
router.post('/forgot-password', forgotPassword)//Olvide mis password
router.route('/forgot-password/:token').get(chekToken).post(newPassword)

router.get('/profile',checkAuth,profile);

export default router