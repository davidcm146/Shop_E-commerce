import React from 'react'
import cancelImage from '../assest/cancel.gif'
import { Link } from 'react-router-dom'

const CancelPayment = () => {
    return (
        <div className='mt-20 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 bg-white'>
            <img src={cancelImage} width={300} height={300} alt="" />

            <p className='text-red-600 font-bold text-xl'>Payment Cancel</p>
            <Link to={"/cart"} className='p-2 my-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Go To Cart</Link>
        </div>
    )
}

export default CancelPayment
