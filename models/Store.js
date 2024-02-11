import { mongoose } from "mongoose";



const storeSchema = mongoose.Schema({

    nameStore:{
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

const Store = mongoose.model('Product',storeSchema)
export default Store