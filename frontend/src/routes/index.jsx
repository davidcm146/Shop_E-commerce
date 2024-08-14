import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryPage from '../pages/CategoryPage';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchResultDisplay from '../pages/SearchResultDisplay';
import SuccessPayment from '../pages/SuccessPayment';
import CancelPayment from '../pages/CancelPayment';
import OrderPage from '../pages/OrderPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },

            {
                path: "sign-up",
                element: <SignUp />
            },

            {
                path: "login",
                element: <Login />
            },

            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "category-product",
                element: <CategoryPage/>
            },
            {
                path: "product-detail/:id",
                element: <ProductDetails/>            
            },
            {
                path: "cart",
                element: <Cart/>          
            },
            {
                path: "search",
                element: <SearchResultDisplay/>        
            },
            {
                path: "success",
                element: <SuccessPayment/>      
            },
            {
                path: "cancel",
                element: <CancelPayment/>   
            },
            {
                path: "order",
                element: <OrderPage/> 
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts/>
                    }
                    
                ]
            }
            ,

        ]
    }
])

export default router;