import { mongoose } from "mongoose";



const storeSchema = mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true
    },
    lat:{
        type:Number,
        trim:true,
        
    },
    long:{
        type:Number,
        trim:true,
        required:true
    },

})

const Store = mongoose.model('Store',storeSchema)
export default Store