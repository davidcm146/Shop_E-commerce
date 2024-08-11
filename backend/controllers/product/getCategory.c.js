const productModel = require("../../models/productModel")

const getCategoryController = async (req, res) => {
    try {
        const productCategory = await productModel.distinct("category");

        const productByCategory = [];
        for (const category of productCategory) {
            const product = await productModel.findOne({category: category});
            if (product) {
                productByCategory.push(product);
            }
        }

        res.status(200).json({
            message: "Category product found",
            data: productByCategory,
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

module.exports = getCategoryController