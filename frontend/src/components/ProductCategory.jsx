import React, { useEffect, useState } from 'react'
import summaryURL from '../common';
import {Link} from 'react-router-dom'

const ProductCategory = () => {
    const [productCategory, setProductCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoading = new Array(13).fill(null)

    const fetchProductCategory = async () => {
        setLoading(true)
        const dataResponse = await fetch(summaryURL.productCategory.url, {
            method: summaryURL.productCategory.method,
        });

        const result = await dataResponse.json();
        if (result.success) {
            setLoading(false)
            setProductCategory(result.data);
        }
    }

    useEffect(() => {
        fetchProductCategory();
    }, [])
    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-x-scroll scrollbar-none'>
                {
                    loading ? (
                        categoryLoading.map((_,index)=>{
                            return(
                                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
                                </div>
                            )
                    })
                    ) :
                    (
                            productCategory.map((product, index) => {
                                return (
                                    <Link to={"/category-product?category="+product?.category} className='cursor-pointer' key={product?.category}>
                                        <div key={index} className='w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden p-6 bg-slate-200 flex items-center justify-center'>
                                            <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                                        </div>
                                        <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                                    </Link>
                                )
                            })
                        )
                }
            </div>
        </div>
    )
}

export default ProductCategory
