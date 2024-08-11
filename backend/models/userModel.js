const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: String,
    email : {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    role: String,
    profileAvatar: String
}, {
    timestamps: true
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel