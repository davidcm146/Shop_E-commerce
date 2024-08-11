const productModel = require("../../models/productModel")

const getProductsController = async (req, res) => {
    try {
        const getProducts = await productModel.find().sort({createAt: -1});
        res.json({
            message: "Products found",
            success: true,
            error: false,
            data: getProducts
        })
    } catch (err) {
        res.status(400).json({
            message: "Products not found",
            success: false,
            error: true
        });
    }
}

module.exports = getProductsController