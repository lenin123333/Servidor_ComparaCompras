import ShoppingCart from "../models/ShoppingCart.js"



const addProduct = async (req, res) => {
    const existOrder = await ShoppingCart.findOne
        ({ creator: req.user._id, active: true });

    if (existOrder) {

        
        req.body.cart.forEach((item, index) => {
            const { store, product, amount, price } = item;
            const existingProduct = existOrder.cart.find(item =>
                item.store.toString() === store.toString() && item.product.toString() === product.toString()
            );
            // Filtrar los productos diferentes al actual
            const updatedCart = existOrder.cart.filter(item =>
                item.store.toString() !== store.toString() || item.product.toString() !== product.toString()
            );

            if (!existingProduct) {
                // Si el producto no existe en el carrito, agregarlo
                updatedCart.push({ store, product, amount, price });
            } else {
                // Si el producto ya existe, actualizar la cantidad
                existingProduct.amount += amount;
                updatedCart.push(existingProduct);
            }
            existOrder.cart = updatedCart;
        });



        // Buscar el producto en el carrito existente
        
        await existOrder.save();
        const totalAmount= await ShoppingCart.aggregate([
            {
                $match: {
                    creator: req.user._id,
                    active: true
                }
            },
            {
                $unwind: "$cart"
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$cart.amount" },
                }
            }
]);
       
        return res.json(totalAmount);
    }


    const newOrder = new ShoppingCart(req.body)

    newOrder.creator = req.user._id;
    newOrder.save();
    res.json(newOrder)
}


const getShoopingCart = async (req, res) => {
    
    
        const existOrder = await ShoppingCart.aggregate([
            {
                $match: {
                    creator: req.user._id,
                    active: true
                }
            },
            {
                $unwind: "$cart"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "cart.product",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            {
                $lookup: {
                    from: "stores",
                    localField: "cart.store",
                    foreignField: "_id",
                    as: "storeInfo"
                }
            },
            {
                $group: {
                    _id: "$cart.store",
                    storeName: { $first: "$storeInfo.name" },
                    products: {
                        $push: {
                            _id: "$cart._id",
                            productName: { $first: "$productInfo.name" },
                            amount: "$cart.amount",
                            price: "$cart.price",
                            image: { $first: "$productInfo.imagen" },
                        }
                    },
                    totalAmount: { $sum: "$cart.amount" },
                    totalPrice: { $sum: { $multiply: ["$cart.amount", "$cart.price"] } }
                }
            }
        ]);
      
    
      
    res.json(existOrder)
}


const descountProduct = async (req, res) => {
    const existOrder = await ShoppingCart.findOne
        ({ creator: req.user._id, active: true });

    if (existOrder) {
        const { id } = req.body;

        // Buscar el producto en el carrito existente

        const existingProduct = existOrder.cart.find(item =>
            item._id.toString() === id
        );

        // Filtrar los productos diferentes al actual
        const updatedCart = existOrder.cart.filter(item =>
            item._id.toString() !== id
        );


        // Si el producto ya existe, actualizar la cantidad
        existingProduct.amount -= 1;
        updatedCart.push(existingProduct);


        existOrder.cart = updatedCart;
        await existOrder.save();


        return res.json({ "msg": "Decrementado" });
    }


    const newOrder = new ShoppingCart(req.body)
    newOrder.creator = req.user._id;
    newOrder.save();
    res.json(newOrder)
}


const amountProduct = async (req, res) => {
    const existOrder = await ShoppingCart.findOne
        ({ creator: req.user._id, active: true });

    if (existOrder) {
        const { id } = req.body;

        // Buscar el producto en el carrito existente

        const existingProduct = existOrder.cart.find(item =>
            item._id.toString() === id
        );

        // Filtrar los productos diferentes al actual
        const updatedCart = existOrder.cart.filter(item =>
            item._id.toString() !== id
        );


        // Si el producto ya existe, actualizar la cantidad
        existingProduct.amount += 1;
        updatedCart.push(existingProduct);


        existOrder.cart = updatedCart;
        await existOrder.save();
        return res.json({ "msg": "Aumentado" });
    }


    const newOrder = new ShoppingCart(req.body)
    newOrder.creator = req.user._id;
    newOrder.save();
    res.json(newOrder)
}


const saveShoopingCart = async (req, res) => {
    const existOrder = await ShoppingCart.findOne
        ({ creator: req.user._id, active: true });

    existOrder.active = false;
    await existOrder.save();
    res.json(existOrder)
}

const showShoopingCart = async (req, res) => {

}

const getShoopingCartById = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const existOrder = await ShoppingCart.aggregate([
        {
            $match: {
                _id: id,
                creator: req.user._id,
                active: false

            }
        },
        {
            $unwind: "$cart"
        },
        {
            $lookup: {
                from: "products",
                localField: "cart.product",
                foreignField: "_id",
                as: "productInfo"
            }
        },
        {
            $lookup: {
                from: "stores",
                localField: "cart.store",
                foreignField: "_id",
                as: "storeInfo"
            }
        },
        {
            $group: {
                _id: "$cart.store",
                storeName: { $first: "$storeInfo.name" },
                products: {
                    $push: {
                        _id: "$cart._id",
                        productName: { $first: "$productInfo.name" },
                        amount: "$cart.amount",
                        price: "$cart.price"
                    }
                },
                totalAmount: { $sum: "$cart.amount" },
                totalPrice: { $sum: { $multiply: ["$cart.amount", "$cart.price"] } }
            }
        }
    ]);

    res.json(existOrder)

}


export {
    addProduct,
    getShoopingCart,
    descountProduct,
    amountProduct,
    saveShoopingCart,
    showShoopingCart,
    getShoopingCartById
}