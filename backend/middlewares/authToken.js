const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers;
        if (!token){
            return res.status(401).json({
                message: "Please login ...",
                success: false,
                error: true
            })
        }
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) =>{
            if (err){
                throw new Error ("Authentication fail !");  
            }
            req.userId = decoded?._id;
            next();
        })
    } catch (err) {
        res.status(401).json({
            message: err.message,
            data: [],
            success: false,
            error: true
        });
    }
}

module.exports = authToken