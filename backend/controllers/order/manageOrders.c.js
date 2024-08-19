const orderModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const manageOrdersController = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);

        if (user.role !== 'ADMIN'){
            return res.status(500).json({
                message : "Not access",
                success : false,
                error : true
            })
        }

        const allOrders = await orderModel.find().sort({createdAt : -1});

        res.status(200).json({
            message : "Orders found",
            data : allOrders,
            success : true,
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

module.exports = manageOrdersController