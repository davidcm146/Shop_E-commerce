const productModel = require("../../models/productModel");

const getProductDetailsController = async (req, res) => {
    try {
        const {productId} = req.body;

        const product = await productModel.findById(productId);

        res.status(200).json({
            message: "Product detail found",
            data: product,
            success: true,
            error: false
        })
        
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        });
    }
}

module.exports = getProductDetailsController