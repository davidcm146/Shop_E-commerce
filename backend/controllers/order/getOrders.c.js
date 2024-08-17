const orderModel = require("../../models/orderProductModel");

const getOrdersController = async(req, res) => {
    try {
        const sessionUser = req.userId;

        const orders = await orderModel.find({userId : sessionUser}).sort({createdAt : -1});

        res.status(200).json({
            data : orders,
            success : true,
            error : false,
            message : "Orders found"
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        });
    }
}

module.exports = getOrdersController