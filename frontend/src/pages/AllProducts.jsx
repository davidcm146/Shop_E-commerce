import React, { useEffect, useState } from 'react';
import UploadProducts from '../components/UploadProducts';
import summaryURL from '../common';
import { toast } from 'react-toastify';
import { MdEdit } from "react-icons/md";
import EditProduct from '../components/EditProduct';
import formatCurrency from '../helper/currencyChange';

const AllProducts = () => {
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const fetchAllProducts = async () => {
    const dataResponse = await fetch(summaryURL.getProducts.url, {
      method: summaryURL.getProducts.method,
      credentials: 'include',
    });
    const result = await dataResponse.json();
    if (result.success) {
      setAllProducts(result.data);
      setFilteredProducts(result.data);
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Filter products based on search term, selected category, and selected brand
  useEffect(() => {
    let filtered = allProducts;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (selectedBrand) {
      filtered = filtered.filter(product => product.brandName === selectedBrand);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedBrand, allProducts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const uniqueCategories = [...new Set(allProducts.map(product => product.category))];
  const uniqueBrands = [...new Set(allProducts.map(product => product.brandName))];

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className='font-bold text-lg'>All Products</h2>
        <button
          type="button"
          onClick={() => setOpenModalUpload(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Upload
        </button>
      </div>
      {openModalUpload && <UploadProducts onClose={() => setOpenModalUpload(false)} calFunc={fetchAllProducts} />}

      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by Product Name"
            className="p-2 w-60 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={selectedBrand}
            onChange={handleBrandChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Brands</option>
            {uniqueBrands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[calc(100vh-200px)]">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-800 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-16 py-3"><span className="sr-only">Image</span></th>
                <th scope="col" className="px-6 py-3">Product Name</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="p-4">
                    <img
                      src={product.productImage[0]}
                      className="w-16 md:w-28 rounded-lg border-slate-400 border max-w-full max-h-full"
                      alt={product.productName}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{product.productName}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-12 py-4">{product.quantity}</td>
                  <td className="px-5 py-4 font-semibold text-gray-900">{formatCurrency(product.price)}</td>
                  <td className="px-8 py-4">
                    <button
                      onClick={() => { setOpenModalEdit(true); setUpdatedProduct(product); }}
                      className="text-lg text-black p-2 rounded-full bg-slate-300 hover:bg-slate-200 hover:text-white"
                    >
                      <MdEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {openModalEdit && <EditProduct onClose={() => setOpenModalEdit(false)} data={updatedProduct} calFunc={fetchAllProducts} />}
    </div>
  );
}

export default AllProducts;
