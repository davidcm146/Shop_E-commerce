const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function signUpController(req, res) {
    try {
        const {email, password, fullname} = req.body;
        const user = await userModel.findOne({email});
        
        if (user){
            throw new Error ("User already exists !");
        }

        if (!email){
            throw new Error ("Please retype your email !");
        }

        if (!password){
            throw new Error ("Please retype your password !");
        }

        if (!fullname){
            throw new Error ("Please retype your fullname !");
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        if (!hashedPassword){
            throw new Error ("Something is wrong with hashed password");
        }
        const userData = new userModel({
            ...req.body,
            role: "CUSTOMER",
            password: hashedPassword
        });

        const saveUSer = userData.save();

        res.json({
            data: saveUSer,
            success: true,
            error: false,
            message: 'User created successfully!'
        })
        
    } catch (err) {
        res.json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

module.exports = signUpController