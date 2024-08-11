const cartProductModel = require("../../models/cartProductModel");

const countProductInCartController = async(req, res) => {
    try {
        const sessionUser = req.userId;

        const count = await cartProductModel.countDocuments({
            userId: sessionUser
        })

        res.status(200).json({
            data : {
                count : count
            },
            message : "Ok",
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

module.exports = countProductInCartController