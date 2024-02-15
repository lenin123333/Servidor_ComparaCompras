import ShoppingCart from "../models/ShoppingCart.js"



const addProduct = async(req,res) =>{


    const existOrder = await ShoppingCart.findOne({ creator: req.user._id, active: true });
    
    if (existOrder) {
        const { store, product, amount } = req.body.cart[0];
    
        // Buscar el producto en el carrito existente
        const existingProduct = existOrder.cart.find(item =>
            item.store.toString() === store.toString() && item.product.toString() === product.toString()
        );
    
        // Filtrar los productos diferentes al actual
        const updatedCart = existOrder.cart.filter(item =>
            item.store.toString() !== store.toString() || item.product.toString() !== product.toString()
        );
    
        if (!existingProduct) {
            // Si el producto no existe en el carrito, agregarlo
            updatedCart.push({ store, product, amount });
        } else {
            // Si el producto ya existe, actualizar la cantidad
            existingProduct.amount += amount;
            updatedCart.push(existingProduct);
        }
    
        existOrder.cart = updatedCart;
        await existOrder.save();

        return res.json(existOrder);
    }
    
    
    const newOrder = new ShoppingCart(req.body)
    newOrder.creator=req.user._id;
    newOrder.save();
    res.json(newOrder)
}


export {
    addProduct
}