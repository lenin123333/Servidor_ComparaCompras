import express from 'express'
import dotenv from 'dotenv'
import conectarDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';


const app = express();
app.use(express.json());

dotenv.config();
conectarDB()

app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
const servidor = app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})