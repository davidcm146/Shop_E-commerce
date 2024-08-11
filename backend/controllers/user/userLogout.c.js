
const userLogoutController = async (req, res) =>{
    try {
        await res.clearCookie("token");
        res.json({
            message: "Logged out successfully",
            success: true,
            error: false,
            data: []
        })
    } catch (err) {
        res.json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

module.exports = userLogoutController