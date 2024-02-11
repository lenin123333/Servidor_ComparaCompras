import Category from "../models/Category.js";



const addCategory = async (req,res)=>{
    const{name}= req.body;
    const existCategory = await Category.findOne({name})

    if(!existCategory){
        const category = new Category(req.body)
        await category.save()
        res.json({"msg":"Categoria Agregada Correctamente"})
    }else{
        const error = new Error('La Categoria ya Existe')
        return res.status(404).json({ msg: error.message })
    }
}
const getsCategory = async (req,res)=>{
    const category = await Category.find({}).select('-__v');
    res.json(category)

   
}


const addProduc =async (req,res)=>{
    
    // Accede a la URL de la imagen desde el objeto de solicitud
    const imagenUrl = req.imagenUrl;
    res.json({ url: imagenUrl });
}


export{
    addProduc,
    addCategory,
    getsCategory
}