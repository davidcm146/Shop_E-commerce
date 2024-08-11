const cartProductModel = require("../../models/cartProductModel");
const productModel = require("../../models/productModel");

const deleteProductInCart = async(req, res) => {
    try {
        const sessionUser = req?.userId;
        const cartProductId = req.body._id;
        const productId = req.body.productId;

        const cartProduct = await cartProductModel.findOne({_id: cartProductId, userId : sessionUser});

        if (!cartProduct){
            return res.status(404).json({
                message: "Product not found in cart",
                success: false,
                error: true,
            });
        }

        const productQtyInCart = cartProduct.quantity;

        await cartProductModel.deleteOne({_id : cartProductId, userId: sessionUser});

        const updateProductQuantity = await productModel.updateOne(
            { _id: productId },
            { $inc: { quantity: productQtyInCart } }
        );

        res.status(200).json({
            message: "Product removed from cart",
            data: { updateProductQuantity },
            error: false,
            success: true,
        });

        
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        });
    }
}

module.exports = deleteProductInCart