import React from 'react'
import { IoClose } from "react-icons/io5";


const DisplayImage = ({ imgUrl, onClose}) => {
    return (
        <div className='fixed bottom-16 top-auto right-0 left-0'>
            <div className="bg-white shadow-lg rounded max-w-3xl mx-auto">
                <div className="w-fit ml-auto text-2xl hover:text-slate-500 cursor-pointer p-1" onClick={onClose}>
                    <IoClose/>
                </div>
                <div className="flex justify-center items-center mx-auto p-4 max-w-[80vh] max-h-[80vh]">
                    <img className='w-fit h-fit object-scale-down' src={imgUrl} alt="" />
                </div>
            </div>
        </div>
    )
}

export default DisplayImage
