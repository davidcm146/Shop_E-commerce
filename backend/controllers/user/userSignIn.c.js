const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");


const userSignInController = async (req, res) =>{
    try {
        const {email, password} = req.body;

        if (!email){
            throw new Error ("Please retype your email !");
        }

        if (!password){
            throw new Error ("Please retype your password !");
        }

        const user = await userModel.findOne({email});
        
        if (!user){
            throw new Error ("User not found !");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (isValid){
            const tokenData = {
                _id: user._id,
                email: user.email,
            };

            const token = jwt.sign(
                tokenData
            , process.env.TOKEN_SECRET,{
                expiresIn: 60 * 60
            })

            const tokenOption = {
                httpOnly: true,
                secure: true
            }

            res.cookie("token", token, tokenOption).json({
                message: "Login successfully !",
                data: token,
                success: true,
                error: false
            })
        }
        else{
            throw new Error ("Login failed !");

        }

    } catch (err) {
        res.json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

module.exports = userSignInController