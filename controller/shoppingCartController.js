import ShoppingCart from "../models/ShoppingCart.js"
import mongoose from 'mongoose';



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
        const totalAmount = await ShoppingCart.aggregate([
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
    } else {




        const newOrder = new ShoppingCart(req.body)

        newOrder.creator = req.user._id;
        newOrder.save();
        let totalAmount=0;
        console.log(req.body.cart)
        req.body.cart.forEach((item, index) => {
            const { store, product, amount, price } = item;
            totalAmount+=amount

        })

        return res.json([{id:null,totalAmount}]);
    }
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

    // Calcular el total general
    const totalGeneral = existOrder.reduce((acc, store) => {
        acc.totalProductsCount += store.totalAmount;
        acc.totalCartPrice += store.totalPrice;
        return acc;
    }, { totalProductsCount: 0, totalCartPrice: 0 });

    res.json({ existOrder, totalGeneral });
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
        const totalCar = await ShoppingCart.aggregate([
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
                    _id: null,
                    totalAmount: { $sum: "$cart.amount" },
                    totalPrice: { $sum: { $multiply: ["$cart.amount", "$cart.price"] } }
                }
            }
        ]);

        return res.json(totalCar);
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

        const totalCar = await ShoppingCart.aggregate([
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
                    _id: null,
                    totalAmount: { $sum: "$cart.amount" },
                    totalPrice: { $sum: { $multiply: ["$cart.amount", "$cart.price"] } }
                }
            }
        ]);

        return res.json(totalCar);
    }


    const newOrder = new ShoppingCart(req.body)
    newOrder.creator = req.user._id;
    newOrder.save();
    res.json(newOrder)
}


const saveShoopingCart = async (req, res) => {
    const existOrder = await ShoppingCart.findOne
        ({ creator: req.user._id, active: true });

    if (existOrder) {
        existOrder.active = false;

        const ubiStores = await ShoppingCart.aggregate([
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
                    lat: { $first: "$storeInfo.lat" },
                    long: { $first: "$storeInfo.long" } // Assuming "location" is the field with lat and long

                }
            }
        ]);

        // Result will contain an array of objects with storeName and location

        await existOrder.save();
        res.json(ubiStores)
    }


}



const deleteShoopingCartById = async (req, res) => {
    const existOrder = await ShoppingCart.findOne
        ({ creator: req.user._id, active: true });

    if (existOrder) {

        console.log(existOrder.cart)
        const newArreglo = existOrder.cart.filter((item) =>
            item._id.toString() !== req.body.id.toString()
        )


        // Buscar el producto en el carrito existente
        existOrder.cart = newArreglo

        await existOrder.save();
        const totalCar = await ShoppingCart.aggregate([
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
                    _id: null,
                    totalAmount: { $sum: "$cart.amount" },
                    totalPrice: { $sum: { $multiply: ["$cart.amount", "$cart.price"] } }
                }
            }
        ]);

        return res.json(totalCar);
    }
}

const showShoopingCart = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10; // Cantidad de resultados por página

    try {
        const [totalCarCount, totalCar] = await Promise.all([
            ShoppingCart.aggregate([
                {
                    $match: {
                        creator: req.user._id,
                        active: false
                    }
                },
                {
                    $count: "total"
                }
            ]),
            ShoppingCart.aggregate([
                {
                    $match: {
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
                        _id: "$_id", // Agrupar por el ID del carrito
                        totalAmount: { $sum: "$cart.amount" },
                        totalPrice: { $sum: { $multiply: ["$cart.amount", "$cart.price"] } }
                    }
                },
                {
                    $skip: (page - 1) * perPage // Saltar resultados según la página
                },
                {
                    $limit: perPage // Limitar resultados por página
                }
            ])
        ]);

        console.log(totalCar)
        const totalProducts = totalCarCount.length > 0 ? totalCarCount[0].total : 0;
        const totalPages = Math.ceil(totalProducts / perPage);
        return res.json({ totalProducts, totalPages, shoppingCart: totalCar });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


const getShoopingCartById = async (req, res) => {
    const { id } = req.params
   
    const existOrder = await ShoppingCart.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
                creator: req.user._id
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



export {
    addProduct,
    getShoopingCart,
    descountProduct,
    amountProduct,
    saveShoopingCart,
    showShoopingCart,
    getShoopingCartById,
    deleteShoopingCartById
}