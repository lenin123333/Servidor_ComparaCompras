import { mongoose } from "mongoose";


const shopingCartSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    }
});

const ShoppingCart = mongoose.model('ShoppingCart', shopingCartSchema);
export default ShoppingCart;
