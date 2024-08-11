import React, { useEffect, useState } from 'react'
import UploadProducts from '../components/UploadProducts'
import summaryURL from '../common';
import { toast } from 'react-toastify';
import { MdEdit } from "react-icons/md";
import EditProduct from '../components/EditProduct';
import formatCurrency from '../helper/currencyChange';

const AllProducts = () => {
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState({
    _id: "",
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    productDescription: "",
    price: "",
    quantity: "",
  });

  const fetchAllProducts = async () => {
    const dataResponse = await fetch(summaryURL.getProducts.url, {
      method: summaryURL.getProducts.method,
      credentials: 'include',
    })
    const result = await dataResponse.json();
    if (result.success) {
      // toast.success(result.message);
      setAllProducts(result.data);
    }
    else {
      toast.error(result.message);
    }
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])


  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className='font-bold text-lg'>All Products</h2>
        <button type="button" onClick={() => setOpenModalUpload(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload</button>
      </div>
      {
        openModalUpload && <UploadProducts onClose={() => setOpenModalUpload(false)} calFunc={fetchAllProducts} />
      }
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[calc(100vh-200px)]">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-800 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              allProducts.map((product, index) => {
                return (
                  <tr key={index} className="bg-white border-b hover:bg-gray-100">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="p-4">
                      <img src={product.productImage[0]} className="w-16 md:w-28 rounded-lg border-slate-400 border max-w-full max-h-full" alt={product.productName} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {product.productName}
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-12 py-4">{product.quantity}</td>
                    <td className="px-5 py-4 font-semibold text-gray-900">{formatCurrency(product.price)}</td>
                    <td className="px-8 py-4">
                      <button onClick={() => {setOpenModalEdit(true); setUpdatedProduct(product)}} className='text-lg text-black p-2 rounded-full bg-slate-300 hover:bg-slate-200 hover:text-white'><MdEdit /></button>
                    </td>

                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      {
        openModalEdit && <EditProduct onClose={() => setOpenModalEdit(false)} data={updatedProduct} calFunc={fetchAllProducts} />
      }
    </div>
  )
}

export default AllProducts
