const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/productModel");

const updateProductsController = async(req, res) => {
    try {
        const sessionUser = req?.userId;
        if (!uploadProductPermission(sessionUser)){
            throw new Error("Permission denied");
        }
        const {_id, ...restBody} = req.body;

        const updateProduct = await productModel.findByIdAndUpdate(_id, restBody);

        if(updateProduct){
            res.json({
                message: "Product updated successfully",
                data: updateProduct,
                success: true,
                error: false
            });
        }
        else{
            throw new Error("Can not update product");
        }
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        });
    }
}

module.exports = updateProductsController