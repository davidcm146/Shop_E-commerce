import React, { useContext, useEffect, useState } from 'react';
import summaryURL from '../common';
import { toast } from 'react-toastify';
import formatCurrency from '../helper/currencyChange';
import Context from '../context/AuthContext';
import { MdDelete } from "react-icons/md";
import {loadStripe} from "@stripe/stripe-js"

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingList = new Array(context.cartProductCount).fill(null);

    const fetchCartProduct = async () => {
        const dataResponse = await fetch(summaryURL.viewCartProduct.url, {
            method: summaryURL.viewCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
        });
        const result = await dataResponse.json();
        if (result.success) {
            setData(result.data);
            if (result.data.length === 0) {
                toast.info("No product found");
            }
        } else {
            toast.error(result.message);
        }
    };

    const updateCartQuantity = async (id, productId, qty) => {
        const dataResponse = await fetch(summaryURL.updateCartProduct.url + `/${id}`, {
            method: summaryURL.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty,
                productId: productId
            })
        });
        const result = await dataResponse.json();
        if (result.success) {
            fetchCartProduct(); // Refresh cart after updating
        } else {
            toast.error(result.message); // Display error if the update fails
        }
    };

    const increaseQty = (id, productId, qty) => {
        updateCartQuantity(id, productId, qty + 1);
    };

    const decreaseQty = (id, productId, qty) => {
        if (qty > 1) { // Ensure quantity doesn't go below 1
            updateCartQuantity(id, productId, qty - 1);
        } else {
            toast.error("Minimum quantity is 1"); // Display error for minimum quantity
        }
    };

    const handleDeleteCartProduct = async (id, productId) => {
        const dataResponse = await fetch(summaryURL.deleteCartProduct.url + `/${id}`, {
            method: summaryURL.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id,
                productId: productId
            })
        });
        const result = await dataResponse.json();
        if (result.success) {
            fetchCartProduct(); // Refresh cart after updating
            context.fetchCountProductInCart();
        } else {
            toast.error(result.message); // Display error if the update fails
        }
    }

    const totalQty = data.reduce((prev, current) => prev + current.quantity, 0)
    const totalPrice = data.reduce((prev, current) => prev + (current.quantity * current?.productId?.price), 0);

    const handleLoading = async () => {
        await fetchCartProduct()
    }

    const handlePayment = async () => {
        const stripePromise = await loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY);
        const response = await fetch(summaryURL.payment.url, {
            method : summaryURL.payment.method,
            credentials : "include",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                cartItems : data
            })
        })
        
        const result = await response.json();
        console.log(result)
        if (result?.id){
            stripePromise.redirectToCheckout({sessionId : result.id});
        }
    }

    useEffect(() => {
        setLoading(true);
        handleLoading();
        setLoading(false);
    }, []);



    return (
        <div className='container mx-auto p-4'>
            <div className="text-center text-lg">
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No product in cart</p>
                    )
                }
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
                <div className="w-full h-full max-h-[calc(100vh-120px)] max-w-5xl">
                    {
                        loading ? (
                            loadingList.map((_, index) => (
                                <div key={index} className="w-full mx-8 bg-slate-200 h-32 my-3 border border-slate-300 animate-pulse rounded"></div>
                            ))
                        ) : (
                            data.map((product, index) => (
                                <div key={index} className="w-full mx-8 bg-white h-32 my-3 border border-slate-300 rounded grid grid-cols-[128px,1fr]">
                                    <div className="w-32 h-32 bg-slate-200 rounded">
                                        <img src={product?.productId?.productImage[0]} alt={product?.productName} className='w-full h-full object-scale-down mix-blend-multiply' />
                                    </div>

                                    <div className="p-5 py-2 relative">
                                        <div onClick={() => handleDeleteCartProduct(product?._id, product?.productId)}
                                            className="absolute right-0 top-3 cursor-pointer text-xl text-red-600 rounded-full p-2 mr-5 hover:bg-red-600 hover:text-white">
                                            <MdDelete />

                                        </div>
                                        <h2 className='text-lg lg:text-2xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                        <div className="flex items-center justify-between">
                                            <p className='text-red-600 font-medium text-lg'>{formatCurrency(product?.productId?.price)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{formatCurrency(product?.productId?.price * product?.quantity)}</p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1">
                                            <button onClick={() => decreaseQty(product?._id, product?.productId, product?.quantity)}
                                                className='pb-1 border border-blue-600 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full hover:bg-blue-400 hover:text-white'>-</button>
                                            <span>{product?.quantity}</span>
                                            <button onClick={() => increaseQty(product?._id, product?.productId, product?.quantity)}
                                                className='pb-1 border border-blue-600 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full hover:bg-blue-400 hover:text-white'>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
                {
                    data[0] && (
                        <div className="mx-8 pt-3 mt-6 lg:mt-0 w-full max-w-sm">
                            {
                                loading ? (
                                    <div className="h-36 bg-slate-200 border rounded border-slate-300 animate-pulse"></div>
                                ) : (
                                    <div className="h-36 bg-slate-200 border rounded border-slate-300">
                                        <h2 className='text-white text-xl text-semibold bg-blue-600 px-4 py-3'>Summary</h2>
                                        <div className="flex items-center justify-between mt-2 px-4 gap-2 font-medium text-lg text-slate-600">
                                            <p>Quantity: </p>
                                            <p> {totalQty}</p>
                                        </div>

                                        <div className="mt-2 flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                                            <p>Total price: </p>
                                            <p>{formatCurrency(totalPrice)}</p>
                                        </div>

                                        <button onClick={handlePayment} className='bg-blue-600 p-3 mt-5 hover:bg-blue-400 text-white w-full rounded'>PURCHASE</button>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Cart;
