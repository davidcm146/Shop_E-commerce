
const userLogoutController = async (req, res) =>{
    try {
        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite : 'None'
        }
        await res.clearCookie("token", tokenOption);
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