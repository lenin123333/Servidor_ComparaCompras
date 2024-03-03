import { populate } from "dotenv";
import Category from "../models/Category.js";
import Products from "../models/Products.js";
import Store from "../models/Store.js";



const addCategory = async (req, res) => {
    const { name } = req.body;
    const existCategory = await Category.findOne({ name })

    if (!existCategory) {
        const category = new Category(req.body)
        await category.save()
        res.json(category)
    } else {
        const error = new Error('La Categoria ya Existe')
        return res.status(404).json({ msg: error.message })
    }
}
const getCategorys = async (req, res) => {
    const category = await Category.find({}).select('-__v');
    res.json(category)


}

const addStore = async (req, res) => {
    const { name, lat, long } = req.body;
    const existStore = await Store.findOne({ name })

    if (existStore) {
        const error = new Error('La Tienda ya Existe')
        return res.status(404).json({ msg: error.message })
    }

    const existStorePosition = await await Store.findOne({ lat, long })
    if (existStorePosition) {
        const error = new Error('La Tienda ya Existe')
        return res.status(404).json({ msg: error.message })
    }

    const store = new Store(req.body)
    await store.save()
    res.json(store)
}


const getStores = async (req, res) => {
    const stores = await Store.find({}).select('-__v');
   
   
    res.json(stores)


}


const addProduc = async (req, res) => {

    const {name}=req.body;
    const existeProduct = await Products.findOne({name})
    if (existeProduct) {
        const error = new Error('El Producto ya Existe')
        return res.status(404).json({ msg: error.message })
    }
    const product = new Products(req.body);
    try {
      
        product.imagen=req.imagenUrl
        product.creator=req.user._id
       
        //Almacenar el registro
        await product.save();
        const productNew = await Products.findOne({_id:product._id})
            .populate({ path: 'category',select:"-__v" })
            .populate({ path: 'prices', populate: { path: 'store' ,select:"-__v" } })
            .select("-__v -creator" );
            console.log(productNew)
        res.json(productNew);
    } catch (error) {
        console.error(error)
        next();       
    }
    // Accede a la URL de la imagen desde el objeto de solicitud
   
}


const getProducts = async(req,res) =>{
    const products = await Products.find()
            .populate({ path: 'category',select:"-__v" })
            .populate({ path: 'prices', populate: { path: 'store' ,select:"-__v" } })
            .select("-__v -creator" );

       
    
    res.json(products)
}

const updateProduc = async (req, res) => {
    const {_id,prices} =req.body;
    const existeProduct = await Products.findOne({_id})
    if(existeProduct){
        const newPrices = existeProduct.prices.map(pricesState=>pricesState.store == prices.store ? prices : pricesState);
        existeProduct.prices=newPrices
        existeProduct.save()
        
        res.json(existeProduct)
    }else{
        const error = new Error('El Producto No Existe')
        return res.status(404).json({ msg: error.message })
    }
    


}

export {
    addProduc,
    addCategory,
    getCategorys,
    addStore,
    getStores,
    updateProduc,
    getProducts
}