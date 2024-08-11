import React, { useState, useEffect } from 'react'
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'


import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";


const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = () => {
        setCurrentImage(prev => (desktopImages.length - 1 > prev ? prev + 1 : 0));
    }

    const previousImage = () => {
        setCurrentImage(prev => (prev > 0 ? prev - 1 : desktopImages.length - 1));
    }

    const goToImage = (index) => {
        setCurrentImage(index);
    };

    useEffect(() => {
        const intervalId = setInterval(nextImage, 4000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='container mx-auto md:px-10 px-6'>
            <div className="h-64 md:h-96 bg-slate-200 w-full relative">
                <div className="absolute z-10 h-full w-full md:flex items-center hidden">
                    <div className="flex justify-between w-full text-2xl">
                        <button onClick={previousImage} className='bg-white shadow-md rounded-full mx-4 p-1'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full mx-4 p-1'><FaAngleRight /></button>
                    </div>
                </div>
                <div className="md:flex h-full overflow-hidden hidden">

                    {
                        desktopImages.map((image, index) => {
                            return (
                                <div key={index} className="w-full h-full min-w-full min-h-full transition-all duration-500 ease-in-out transform" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={image} alt="" className='w-full h-full' />

                                </div>
                            )
                        })

                    }
                    <div className="absolute z-10 bottom-4 w-full md:flex hidden justify-center space-x-2">
                        {
                            desktopImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToImage(index)}
                                    className={`w-3 h-3 rounded-full cursor-pointer ${currentImage === index ? 'bg-white' : 'bg-slate-400'}`}
                                ></button>
                            ))
                        }
                    </div>
                </div>

                <div className="flex h-full overflow-hidden md:hidden">

                    {
                        mobileImages.map((image, index) => {
                            return (
                                <div key={index} className="w-full h-full min-w-full min-h-full transition-all duration-500 ease-in-out transform" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={image} alt="" className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default BannerProduct
