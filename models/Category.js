const mongoose= require('mongoose');
const Schema = mongoose.Schema

const categorySchema = new Schema({

    nombre:{
        type:String,
        trim:true,
    }
})


module.exports = mongoose.model('Category',categorySchema);
