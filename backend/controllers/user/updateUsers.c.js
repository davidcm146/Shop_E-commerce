const userModel = require("../../models/userModel")

const updateUsersController = async(req, res) =>{
    try {
        // const userId = req.userId;
        const {id, email, fullname, role} = req.body;
        const payload = {
            ... ( email && {email : email}),
            ... ( fullname && {fullname : fullname}),
            ... ( role && {role : role})
        };
        // const user = await userModel.findById(id);
        const updateUsers = await userModel.findByIdAndUpdate(id, payload);

        res.json({
            data: updateUsers,
            message: "User updated",
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: "User not found",
            success: false,
            error: true
        });
    }
}

module.exports = updateUsersController