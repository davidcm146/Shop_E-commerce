const userModel = require("../../models/userModel");

const allUsersController = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json({
            message: "All users found",
            data: users,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: "Users not found",
            success: false,
            error: true
        });
    }
}

module.exports = allUsersController