const mongoose = require("mongoose");

const cartProductSchema = mongoose.Schema({
    productId: {
        ref: 'product',
        type: String
    },
    quantity: Number,
    userId: String,

},{
    timestamps: true
})

const cartProductModel = mongoose.model("CartProduct", cartProductSchema)
module.exports = cartProductModel