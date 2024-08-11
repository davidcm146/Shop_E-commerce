const cartProductModel = require("../../models/cartProductModel");
const productModel = require("../../models/productModel");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const sessionUser = req?.userId;

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true,
            });
        }

        const updateProductQuantity = await productModel.updateOne(
            { _id: productId },
            { $inc: { quantity: -1 } }
        );

        const isProductAvailable = await cartProductModel.findOne({productId : productId});

        if (isProductAvailable){
            return res.json({
                message: "Product already existed in cart",
                success : false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: sessionUser,
        }

        const newAddToCart = new cartProductModel(payload);
        const saveProduct = await newAddToCart.save();

        res.json({
            data : {saveProduct, updateProductQuantity},
            message : "Product added to cart",
            success : true,
            error : false
        })

    } catch (err) {
        res.json({
            message: err?.message,
            success: false,
            error: true
        })
    }
}

module.exports = addToCartController