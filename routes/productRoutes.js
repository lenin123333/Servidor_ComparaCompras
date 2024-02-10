import express from 'express';
import uploadImagenMiddleware from '../middleware/uploadFile.js';


const router = express.Router();

router.post('/subir-imagen', uploadImagenMiddleware, (req, res) => {
    // Accede a la URL de la imagen desde el objeto de solicitud
    const imagenUrl = req.imagenUrl;
    res.json({ url: imagenUrl });
});

export default router;