import express from 'express'
import dotenv from 'dotenv'
import conectarDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import shoppingCartRoutes from './routes/shoppingCartRoutes.js';
import cors from 'cors'


const app = express();
app.use(express.json());

dotenv.config();
conectarDB()


const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin:function(origin,callback){
        if(whiteList.includes(origin)){
            //Puede consultar la api
            callback(null,true);
        }else{
            //No esta permitido su req
            callback(new Error("Error de Cors"));
        }
    }
}

app.use(cors(corsOptions))


app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/shopping",shoppingCartRoutes)
const servidor = app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})