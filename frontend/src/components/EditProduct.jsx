import React, { useState, useEffect } from 'react'
import productCategory from '../helper/productCategory';
import { FaCloudUploadAlt } from 'react-icons/fa';
import uploadImage from "../helper/uploadImage"
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import summaryURL from '../common';
import { toast } from 'react-toastify';

const EditProduct = ({ onClose, data, calFunc }) => {
    const [products, setProducts] = useState({
        _id: data?._id,
        productName: data?.productName,
        brandName: data?.brandName,
        category: data?.category,
        productImage: data?.productImage,
        productDescription: data?.productDescription,
        price: data?.price,
        quantity: data?.quantity,
    });
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);


    const handleChangeProduct = (e) => {
        const { name, value } = e.target;
        setProducts((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        // console.log(file)
        const uploadImageCloudinary = await uploadImage(file)
        setProducts((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })

    };

    const handleDeleteUploadImage = async (index) => {
        const newProductImage = [...products.productImage];
        newProductImage.splice(index, 1);
        setProducts((prev) => {
            return {
                ...prev,
                productImage: [...newProductImage]
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataResponse = await fetch(summaryURL.updateProducts.url + `/${data._id}`, {
            method: summaryURL.updateProducts.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(products)
        })

        const result = await dataResponse.json();
        if (result.success) {
            toast.success(result?.message);
            onClose();
            calFunc();
        }
        else {
            toast.error(result?.message);
        }
    }
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
            <div className="relative p-4 w-full max-w-xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Edit Product</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            data-modal-toggle="crud-modal"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-800">Product Name</label>
                                    <input
                                        type="text"
                                        name="productName"
                                        id="productName"
                                        value={products?.productName}
                                        onChange={handleChangeProduct}
                                        className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Type product name"
                                        required
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="brandName" className="block mb-2 text-sm font-medium text-gray-800">Brand Name</label>
                                    <input
                                        type="text"
                                        name="brandName"
                                        id="brandName"
                                        value={products?.brandName}
                                        onChange={handleChangeProduct}
                                        className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Type brand name"
                                        required
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-800">Category</label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={products?.category}
                                        onChange={handleChangeProduct}
                                        className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    >
                                        <option value="">
                                            Select Category
                                        </option>
                                        {productCategory.map((category, index) => (
                                            <option key={category.value + index} value={category.value}>{category.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-800">Product Image</label>
                                    <div className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <FaCloudUploadAlt className="w-10 h-10 mb-1 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        </div>
                                        <input
                                            type="file"
                                            name="productImage"
                                            accept="image/*"
                                            id="productImage"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    {/* {fileName && (
                                        <div className="mt-2 text-gray-800">
                                            <p>Selected file: {fileName}</p>
                                        </div>
                                    )} */}


                                    <div>
                                        {
                                            products?.productImage[0] ? (
                                                <div className="flex items-center gap-2">
                                                    {
                                                        products?.productImage.map((item, index) => {
                                                            return (
                                                                <div key={index} className="relative group">
                                                                    <img src={item}
                                                                        width={80} height={80}
                                                                        alt={item}
                                                                        className='bg-slate-100 border mt-2 rounded-lg cursor-pointer'
                                                                        onClick={() => { setOpenFullScreenImage(true); setFullScreenImage(item) }} />
                                                                    <div onClick={() => { handleDeleteUploadImage(index) }} className="absolute rounded-full bottom-0 right-0 p-1 text-white bg-red-600 cursor-pointer hover:bg-red-400 hidden group-hover:block">
                                                                        <MdDelete />
                                                                    </div>
                                                                </div>

                                                            )
                                                        })
                                                    }
                                                </div>
                                            ) : (
                                                <p className='text-red-600 text-xs'>*Please upload product image</p>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-800">Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        value={products?.quantity}
                                        onChange={handleChangeProduct}
                                        className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Enter quantity"
                                        min={0}
                                        required
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-800">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        value={products?.price}
                                        onChange={handleChangeProduct}
                                        className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Enter price"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="productDescription" className="block mb-2 text-sm font-medium text-gray-800">Product Description</label>
                                    <textarea
                                        id="productDescription"
                                        name="productDescription"
                                        value={products?.productDescription}
                                        onChange={handleChangeProduct}
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-800 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Write product description here"
                                    ></textarea>
                                </div>


                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Update product
                            </button>
                        </form>
                    </div>
                    {
                        openFullScreenImage && <DisplayImage imgUrl={fullScreenImage} onClose={() => setOpenFullScreenImage(false)} />
                    }
                </div>
            </div>
        </div>
    )
}

export default EditProduct
