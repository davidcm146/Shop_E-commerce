const commonURL = import.meta.env.VITE_BACKEND_DOMAIN;

const summaryURL = {
    signUp: {
        url: `${commonURL}/sign-up`,
        method: "post"
    },
    signIn: {
        url: `${commonURL}/login`,
        method: "post"
    },
    userDetail: {
        url: `${commonURL}/user-detail`,
        method: "get"
    },
    logout: {
        url: `${commonURL}/logout`,
        method: "get"
    },
    allUsers: {
        url: `${commonURL}/all-users`,
        method: "get"
    },
    updateUsers: {
        url: `${commonURL}/update-user`,
        method: "put"
    },
    uploadProducts: {
        url: `${commonURL}/upload-product`,
        method: "post"
    },
    getProducts: {
        url: `${commonURL}/get-products`,
        method: "get"
    },
    updateProducts: {
        url: `${commonURL}/update-product`,
        method: "put"
    },
    productCategory: {
        url: `${commonURL}/get-category`,
        method: "get"
    },
    wiseProduct: {
        url: `${commonURL}/wise-product`,
        method: "post"
    },
    productDetails: {
        url: `${commonURL}/product-detail`,
        method: "post"
    },
    addToCart: {
        url: `${commonURL}/add-to-cart`,
        method: "post"
    },
    countCartProduct: {
        url: `${commonURL}/count-cart-product`,
        method: "get"
    },
    viewCartProduct: {
        url: `${commonURL}/view-cart-product`,
        method: "get"
    },
    updateCartProduct: {
        url: `${commonURL}/update-cart-product`,
        method: "put"
    },
    deleteCartProduct: {
        url: `${commonURL}/delete-cart-product`,
        method: "delete"
    },
    searchProduct: {
        url: `${commonURL}/search`,
        method: "get"
    },
    filterProduct: {
        url: `${commonURL}/filter-product`,
        method: "post"
    },
    payment: {
        url: `${commonURL}/checkout`,
        method: "post"
    },
    getOrders: {
        url: `${commonURL}/order`,
        method: "get"
    },
    
}

export default summaryURL