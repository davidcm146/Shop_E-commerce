const cartProductModel = require("../../models/cartProductModel");
const productModel = require("../../models/productModel");

const viewProductInCartController = async (req, res) => {
    try {
        const sessionUser = req?.userId;
        const allProducts = await cartProductModel.find({userId : sessionUser}).populate("productId");
        

        res.status(200).json({
            data : allProducts,
            message : "Products found",
            success : true,
            error : false
        })
    } catch (err) {
        res.status(400).json({
            message: err?.message,
            success: false,
            error: true
        })
    }
}

module.exports = viewProductInCartController