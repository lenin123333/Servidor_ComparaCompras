import { mongoose } from "mongoose";

const mongoose= require('mongoose');
const Schema = mongoose.Schema

const productoSchema = new Schema({

    name:{
        type:String,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    imagen:{
        type:String
    }
})


module.exports = mongoose.model('Products',productoSchema);
