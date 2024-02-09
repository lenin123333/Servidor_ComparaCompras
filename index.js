import express from 'express'
import dotenv from 'dotenv'
import conectarDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';


const app = express();
app.use(express.json());

dotenv.config();
conectarDB()

app.use("/api/users",userRoutes)

const servidor = app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})