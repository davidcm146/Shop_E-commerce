import React, { useEffect, useRef, useState, useContext } from 'react'
import fetchWiseProduct from '../helper/fetchWiseProduct';
import formatCurrency from '../helper/currencyChange';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCart from '../helper/addToCart';
import Context from '../context/AuthContext';
import scrollTop from '../helper/scrollTop';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadingList = new Array(13).fill(null);

    const scrollElement = useRef();

    const {fetchCountProductInCart} = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchCountProductInCart();
    }

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchWiseProduct(category);

        if (categoryProduct.success) {
            setData(categoryProduct?.data);
            setLoading(false);
        }
    }

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    }


    useEffect(() => {
        fetchData();
    }, [category])
    return (
        <div className='container mx-auto px-10 my-12 relative'>
            <h2 className='text-2xl font-bold py-2'>{heading}</h2>
            <div className="flex items-center gap-4 mt-6 md:gap-6 overflow-x-scroll scrollbar-none transition-all" ref={scrollElement}>

                <button onClick={scrollLeft} className='bg-white shadow-md rounded-full mx-4 absolute left-0 p-2 hidden md:block'><FaAngleLeft /></button>
                <button onClick={scrollRight} className='bg-white shadow-md rounded-full mx-4 absolute right-0 z-10 p-2 hidden md:block'><FaAngleRight /></button>

                {
                    loading ? (loadingList.map((_, index) => {
                        return (
                            <div key={index} className="w-full min-w-[200px] md:min-w-[320px] max-w-[200px] md:max-w-[320px] bg-white rounded-md shadow-md">
                                <div className="bg-slate-200 h-52 p-4 min-w-[280px] md:min-w-[145px] animate-pulse">
                                </div>
                                <div className="p-4 grid gap-2">
                                    <h2 className='md:text-lg font-medium text-base text-ellipsis line-clamp-1 p-2 animate-pulse rounded-full bg-slate-200'></h2>
                                    <p className='capitalize mt-1 p-2 animate-pulse rounded-full bg-slate-200'></p>
                                    <div className='flex gap-3 mt-1 w-full'>
                                        <p className='text-red-600 font-medium w-full p-2 animate-pulse rounded-full bg-slate-200'></p>
                                        <p className='text-slate-500 line-through w-full p-2 animate-pulse rounded-full bg-slate-200'></p>
                                    </div>
                                    <button type="button" className="mx-auto w-full my-2 py-4 animate-pulse rounded-full bg-slate-200"></button>
                                </div>
                            </div>
                        )
                    })) : (
                        data.map((product, index) => {
                            return (
                                <Link to={"/product-detail/" + product?._id} key={index} onClick={scrollTop} className="w-full min-w-[200px] md:min-w-[320px] max-w-[200px] md:max-w-[320px] bg-white rounded-md shadow-md">
                                    <div className="bg-slate-200 h-52 p-4 min-w-[280px] md:min-w-[145px]">
                                        <img src={product?.productImage[0]} alt="" className='object-scale-down mx-auto h-full hover:scale-110 transition-all mix-blend-multiply' />
                                    </div>
                                    <div className="p-4 grid gap-2">
                                        <h2 className='md:text-lg font-medium text-base text-ellipsis line-clamp-1'>{product?.productName}</h2>
                                        <p className='capitalize mt-1'>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium'>{formatCurrency(product?.price)}</p>
                                            <p className='text-slate-500 line-through'>{formatCurrency(product?.price * 2)}</p>
                                        </div>
                                        <button type="button" onClick={(e) => handleAddToCart(e, product?._id)} className="mx-auto w-full my-4 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )

                }
            </div>


        </div>
    )
}

export default VerticalCardProduct
