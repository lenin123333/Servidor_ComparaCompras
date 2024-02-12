import { mongoose } from "mongoose";


const productsSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    prices: [
        {
            store: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Store',
                required: true
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
    imagen: {
        type: String
    }
});

const Products = mongoose.model('Products', productsSchema);
export default Products;
