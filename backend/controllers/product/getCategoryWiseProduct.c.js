const productModel = require("../../models/productModel");

const getCategoryWiseProductController = async (req, res) => {
    try {
        const {category} = req?.body || req?.query;
        const product = await productModel.find({category});

        res.status(200).json({
            data: product,
            message: "Product found",
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

module.exports = getCategoryWiseProductController