const productModel = require("../../models/productModel");

const filterProductController = async(req, res) => {
    try {
        const categoryList = req.body?.category || [];

        const products = await productModel.find({
            "$or" : [
                {
                    category : {"$in" : categoryList}
                }
            ]
        });

        res.status(200).json({
            message : "Products found",
            data : products,
            success: true,
            error : false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        });
    }
}

module.exports = filterProductController