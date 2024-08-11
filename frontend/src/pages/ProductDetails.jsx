import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryAPI from '../common/index'
import { FaStar, FaStarHalf } from 'react-icons/fa6';
import formatCurrency from '../helper/currencyChange';
import VerticalRelatedProduct from '../components/VerticalRelatedProduct.jsx';
import Context from '../context/AuthContext.jsx';
import addToCart from '../helper/addToCart.js';

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState({
    id : "",
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    productDescription: "",
    price: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const productImageLoadingList = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  });

  const navigate = useNavigate();

  const [isZoomImage, setIsZoomImage] = useState(false);

  const fetchProductDetail = async () => {
    setLoading(true);
    const response = await fetch(SummaryAPI.productDetails.url + `/${params?.id}`, {
      method: SummaryAPI.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    const result = await response.json();
    if (result.success) {
      setProductDetail(result?.data);
      setLoading(false);
      setActiveImage(result?.data?.productImage[0]);
    }
  }

  const {fetchCountProductInCart} = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchCountProductInCart();
    }

    const handleBuy = async(e, id) => {
      await addToCart(e, id);
        fetchCountProductInCart();
        navigate("/cart");
    }

  const handleMouseEnterEachImage = (imgURL) => {
    setActiveImage(imgURL);
  }

  const handleZoomImage = useCallback((e) => {
    setIsZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y })
  }, [zoomImageCoordinate])

  const handleZoomOutImage = () => {
    setIsZoomImage(false);
  }

  useEffect(() => {
    fetchProductDetail();
  }, [params.id])

  return (
    <div className='container mx-auto p-10'>

      <div className="min-h-[200px] w-full flex gap-4 flex-col lg:flex-row">

        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative">
            <img src={activeImage}
              onMouseMove={handleZoomImage}
              onMouseLeave={handleZoomOutImage}
              alt={productDetail?.productName}
              className='h-full w-full object-scale-down mix-blend-multiply rounded' />

            {
              isZoomImage && (
                <div className="hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 overflow-hidden">
                  <div className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                    }}>

                  </div>
                </div>
              )
            }
          </div>
          <div className="h-full">
            {
              loading ? (
                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none">
                  {
                    productImageLoadingList.map((_, index) => {
                      return (
                        <div key={index} className="h-20 w-20 mt-2 bg-slate-200 rounded animate-pulse">
                        </div>
                      )
                    })
                  }
                </div>

              ) : (
                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none">
                  {
                    productDetail?.productImage.map((image, index) => {
                      return (
                        <div key={index} className="h-20 w-20 bg-slate-200 rounded p-1">
                          <img src={image}
                            onMouseEnter={() => handleMouseEnterEachImage(image)}
                            alt={"Product image " + index}
                            className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' />

                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>


        {
          loading ? (
            <div className="flex w-full flex-col gap-1">
              <p className='bg-slate-200 animate-pulse rounded-full w-full lg:h-6 mb-1'></p>
              <h2 className='text-2xl lg:text-4xl font-medium bg-slate-200 animate-pulse rounded-full w-full h-10 my-2'></h2>
              <p className='capitalize text-slate-500 bg-slate-200 animate-pulse h-6 w-full rounded-full my-2'></p>
              <div className="text-yellow-300 flex items-center gap-1 bg-slate-200 animate-pulse h-6 w-full rounded-full my-2">


              </div>
              <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-2">
                <p className='text-red-600 bg-slate-200 animate-pulse rounded-full w-full h-10'></p>
                <p className='text-slate-400 line-through bg-slate-200 animate-pulse rounded-full w-full h-10 mx-2'></p>
              </div>

              <div className="flex gap-3 my-2 w-full">
                <button type="button" className="bg-slate-200 animate-pulse rounded-full w-full h-10"></button>
                <button type="button" className="bg-slate-200 animate-pulse rounded-full w-full h-10 mx-2"></button>
              </div>

              <div className="mt-1">
                <p className='text-slate-600 bg-slate-200 animate-pulse rounded-full w-full h-7'></p>
                <p className='bg-slate-200 animate-pulse rounded-full w-full h-10 mt-4'></p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <p className='bg-blue-600 text-blue-100 px-2 rounded-full w-fit'>{productDetail?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-medium'>{productDetail?.productName}</h2>
              <p className='capitalize text-slate-500'>{productDetail?.category}</p>
              <div className="text-yellow-300 flex items-center gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />

              </div>
              <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium">
                <p className='text-red-600'>
                  {formatCurrency(productDetail?.price)}

                </p>
                <p className='text-slate-400 line-through'>
                  {formatCurrency(productDetail?.price * 2)}
                </p>
              </div>

              <div className="flex gap-3 my-2 w-fit min-w-[330px]">
                <button onClick={(e) => handleBuy(e, productDetail?._id)} type="button" className="text-blue-700 hover:text-white min-w-[120px] w-full text-md rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-4 py-2.5 text-center me-2 mb-2 dark:border-blue-600 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">Buy</button>
                <button onClick={(e) => handleAddToCart(e, productDetail?._id)} type="button" className="text-white bg-blue-700 min-w-[120px] w-full text-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
              </div>

              <div className="">
                <p className='text-slate-600 font-medium my-1'>Description:</p>
                <p className='min-w-[120px]'>{productDetail?.productDescription}</p>
              </div>
            </div>
          )
        }
      </div>

      <VerticalRelatedProduct category={productDetail.category} heading={"Related products"} currentProductId={params.id}/>
    </div>
  )
}

export default ProductDetails
