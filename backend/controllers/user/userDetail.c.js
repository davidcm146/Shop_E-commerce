const userModel = require("../../models/userModel");

const userDetailController = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);
        if (user){
            return res.json({
                data: user,
                message: "User information",
                success: true,
                error: false
            })
        }
        else{
            throw new Error ("User not found !");
        }
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        });
    }
}

module.exports = userDetailController