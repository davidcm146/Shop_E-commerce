const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/productModel");

const uploadProductsController = async (req, res) => {
    try {
        const sessionUser = req.userId;
        if (!uploadProductPermission(sessionUser)){
            throw new Error("Permission denied");
        }
        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

        res.status(201).json({
            message: "Product uploaded successfully",
            success: true,
            error: false,
            data: saveProduct
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        });
    }
}

module.exports = uploadProductsController