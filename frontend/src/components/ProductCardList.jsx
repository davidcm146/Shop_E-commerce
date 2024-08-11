import React, { useContext } from 'react'
import scrollTop from '../helper/scrollTop'
import formatCurrency from '../helper/currencyChange'
import Context from '../context/AuthContext'
import addToCart from '../helper/addToCart'
import { Link } from 'react-router-dom'

const ProductCardList = ({loading,data = []}) => {
    const loadingList = new Array(13).fill(null)
    const { fetchCountProductInCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchCountProductInCart()
    }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] mt-8 justify-center md:justify-center md:gap-12 overflow-x-scroll scrollbar-none transition-all'>
    {

         loading ? (
             loadingList.map((product,index)=>{
                 return(
                     <div key={index} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow'>
                         <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                         </div>
                         <div className='p-4 grid gap-3'>
                             <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                             <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                             <div className='flex gap-3'>
                                 <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                 <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                             </div>
                             <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                         </div>
                     </div>
                 )
             })
         ) : (
             data.map((product,index)=>{
                 return(
                     <Link to={"/product-detail/"+product?._id} key={index} className='w-full min-w-[280px]  md:min-w-[300px] max-w-[280px] md:max-w-[300px]  bg-white rounded-sm shadow ' onClick={scrollTop}>
                         <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                             <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                         </div>
                         <div className='p-4 grid gap-3'>
                             <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                             <p className='capitalize text-slate-500'>{product?.category}</p>
                             <div className='flex gap-3'>
                                 <p className='text-red-600 font-medium'>{ formatCurrency(product?.price) }</p>
                                 <p className='text-slate-500 line-through'>{ formatCurrency(product?.price * 2)  }</p>
                             </div>
                             <button type="button" onClick={(e) => handleAddToCart(e, product?._id)} className="mx-auto w-full my-4 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>

                         </div>
                     </Link>
                 )
             })
         )
         
     }
    </div>
  )
}

export default ProductCardList