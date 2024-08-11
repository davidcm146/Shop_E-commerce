const productModel = require("../../models/productModel");

const searchProductController = async (req, res) => {
    try {
        const query = req.query.q;

        // Check if the query exists
        if (!query) {
            return res.status(400).json({
                message: "Search query is required",
                success: false,
                error: true
            });
        }

        // Split the query into keywords for better matching
        const keywords = query.split(' ').map(keyword => ({
            $or: [
                { productName: { $regex: keyword, $options: 'i' } },
                { category: { $regex: keyword, $options: 'i' } }
            ]
        }));

        // Combine conditions with $and
        // Perform the search
        const products = await productModel.find({ $and: keywords });

        res.status(200).json({
            message: "Search product list",
            data: products,
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Error searching products:", err);
        res.status(500).json({
            message: "An error occurred while searching for products",
            success: false,
            error: true
        });
    }
}

module.exports = searchProductController;
