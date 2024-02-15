import { mongoose } from "mongoose";


const shopingCartSchema = mongoose.Schema({
    
    cart:[
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true,
            },
            store:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Store',
                required: true
            },
            amount:{
                type: Number,
                trim: true,
                
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    active:{
        type:Boolean,
        default:true
    }

});

const ShoppingCart = mongoose.model('ShoppingCart', shopingCartSchema);
export default ShoppingCart;
