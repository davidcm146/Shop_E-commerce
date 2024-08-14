import React from 'react'
import successImage from '../assest/success.gif'
import { Link } from 'react-router-dom'

const SuccessPayment = () => {
    return (
        <div className='mt-20 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4' style={{ backgroundColor: 'rgba(225,244,229,255)' }}>
            <img src={successImage} className='w-full h-auto' alt="" />

            <p className='text-green-600 font-bold text-xl'>Payment Successful</p>
            <Link to={"/order"} className='p-2 my-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>View Orders</Link>
        </div>
    )
}

export default SuccessPayment
