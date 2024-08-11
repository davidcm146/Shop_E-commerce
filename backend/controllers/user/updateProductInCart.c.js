const cartProductModel = require("../../models/cartProductModel");
const productModel = require("../../models/productModel");

const updateProductInCartController = async (req, res) => {
    try {
        const sessionUser = req?.userId;
        const productCartId = req.body._id;
        const productId = req.body.productId;
        const newQty = req.body.quantity;

        // Fetch the current product details from the product model
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true,
            });
        }

        // Fetch the current quantity of the product in the cart
        const cartProduct = await cartProductModel.findOne({ _id: productCartId, userId: sessionUser });
        if (!cartProduct) {
            return res.status(404).json({
                message: "Product not found in cart",
                success: false,
                error: true,
            });
        }

        const oldQty = cartProduct.quantity;
        const qtyDifference = newQty - oldQty;

        // Check if the requested change is valid based on the inventory
        if (product.quantity < qtyDifference) {
            return res.status(400).json({
                message: "Insufficient quantity in stock",
                success: false,
                error: true,
            });
        }

        // Update the product quantity in the cart
        const updateProductInCart = await cartProductModel.updateOne(
            { _id: productCartId, userId: sessionUser },
            { $set: { quantity: newQty } }
        );

        // Adjust the product quantity in the inventory
        const updateProductQuantity = await productModel.updateOne(
            { _id: productId },
            { $inc: { quantity: -qtyDifference } }
        );

        res.status(200).json({
            message: "Product updated in cart and inventory",
            data: { updateProductInCart, updateProductQuantity },
            error: false,
            success: true,
        });
    } catch (err) {
        res.status(400).json({
            message: err?.message,
            success: false,
            error: true,
        });
    }
};

module.exports = updateProductInCartController;
