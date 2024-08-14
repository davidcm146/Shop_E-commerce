const express = require("express");

const router = express.Router();

const signUpController = require("../controllers/user/userSignUp.c");
const userSignInController = require("../controllers/user/userSignIn.c");
const userDetailController = require("../controllers/user/userDetail.c");
const authToken = require("../middlewares/authToken");
const userLogoutController = require("../controllers/user/userLogout.c");
const allUsersController = require("../controllers/user/allUsers.c");
const updateUsersController = require("../controllers/user/updateUsers.c");
const uploadProductsController = require("../controllers/product/uploadProducts.c");
const getProductsController = require("../controllers/product/getProducts.c");
const updateProductsController = require("../controllers/product/updateProducts.c");
const getCategoryController = require("../controllers/product/getCategory.c");
const getCategoryWiseProductController = require("../controllers/product/getCategoryWiseProduct.c");
const getProductDetailsController = require("../controllers/product/getProductDetails.c");
const addToCartController = require("../controllers/user/addToCart.c");
const countProductInCartController = require("../controllers/user/countProductInCart.c");
const viewProductInCartController = require("../controllers/user/viewProductInCart.c");
const updateProductInCartController = require("../controllers/user/updateProductInCart.c");
const deleteProductInCart = require("../controllers/user/deleteProductInCart.c");
const searchProductController = require("../controllers/product/searchProduct.c");
const filterProductController = require("../controllers/product/filterProduct.c");
const paymentController = require("../controllers/order/payment.c");
const webhookController = require("../controllers/order/webhook.c");

// Users
router.post("/sign-up", signUpController)
      .post("/login", userSignInController)
      .get("/user-detail", authToken, userDetailController)
      .get("/logout", userLogoutController);

// Admin panel interacts with users
router.get("/all-users", authToken, allUsersController)
      .put("/update-user/:id", authToken, updateUsersController);

// Admin panel interacts with products
router.post("/upload-product", authToken, uploadProductsController)
      .get("/get-products", authToken, getProductsController)
      .put("/update-product/:id", authToken, updateProductsController);

// Products
router.get("/get-category", getCategoryController)
      .post("/wise-product/:category", getCategoryWiseProductController)
      .post("/product-detail/:id", getProductDetailsController)
      .get('/search', searchProductController)
      .post('/filter-product', filterProductController);

// Cart products
router.post("/add-to-cart", authToken, addToCartController)
      .get("/count-cart-product", authToken, countProductInCartController)
      .get("/view-cart-product", authToken, viewProductInCartController)
      .put("/update-cart-product/:id", authToken, updateProductInCartController)
      .delete("/delete-cart-product/:id", authToken, deleteProductInCart);

// Payment
router.post("/checkout", authToken, paymentController)
      .post("/webhook", webhookController)

module.exports = router;