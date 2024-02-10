import multer from 'multer';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import generateId from '../helpers/generateId.js';

dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

// Multer configuration for image handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadImagenMiddleware = (req, res, next) => {
  upload.single('imagen')(req, res, async (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al subir la imagen' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
    }

    try {
        console.log('Req file:', req.file);
console.log('File buffer:', req.file.buffer);

      // Generate a unique filename
      const uniqueFilename = generateId();

      // Upload image to Cloudinary directly from buffer
      const result = await cloudinary.uploader.upload(`data:image/png;base64,${req.file.buffer.toString('base64')}`, {
        folder: 'Productos',
        public_id: uniqueFilename
      });
      

      // Add the uploaded image URL to the request object
      const publicId = result.secure_url.split('/').pop();
      req.imagenUrl = publicId;

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al subir la imagen a Cloudinary' });
    }
  });
};

export default uploadImagenMiddleware;
