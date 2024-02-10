import { mongoose } from "mongoose";
const Schema = mongoose.Schema

const categorySchema = mongoose.Schema({

    name:{
        type:String,
        trim:true,
    }
})


const Category = mongoose.model('Category',categorySchema)
export default Category