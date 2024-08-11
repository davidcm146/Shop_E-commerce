import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helper/productCategory'
import ProductCardList from '../components/ProductCardList'
import summaryURL from '../common'

const CategoryPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const url = new URLSearchParams(location.search);
  const urlCategoryList = url.getAll("category");
  const categoryListObject = {};
  urlCategoryList.forEach(url => {
    categoryListObject[url] = true
  })
  const navigate = useNavigate();
  const [selectCategory, setSelectCategory] = useState(categoryListObject);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [sortBy, setSortBy] = useState("");


  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(summaryURL.filterProduct.url, {
      method: summaryURL.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filteredCategory
      })
    })
    // const categoryProduct = await fetchWiseProduct(params.category);
    const result = await response.json();

    if (result.success) {
      setData(result?.data || []);
      setLoading(false);
    }
  }

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      }
    })
  }

  const handleOnChangeSortBy = (e) => {
    const {value} = e.target

    setSortBy(value)
    if(value === "asc"){
      setData(prev => prev.sort((a, b) => a.price - b.price));
    }
    else if(value === "des"){
      setData(prev => prev.sort((a, b) => b.price - a.price));
    }
  }

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map((category) => {
      if (selectCategory[category])
        return category;
      return null;
    }).filter(categoryName => categoryName);
    setFilteredCategory(arrayOfCategory);

    // Format URL back and forth checkbox
    const urlFormat = arrayOfCategory.map((url, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${url}`
      }
      return `category=${url}&&`
    })
    navigate(`/category-product?${urlFormat.join("")}`)
  }, [selectCategory])

  useEffect(() => {
    fetchProduct();
  }, [filteredCategory])

  useEffect(() => {

  }, [sortBy])

  return (
    <div className='container mx-auto p-4'>
      {/* Desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* Sidebar */}
        <div className="bg-white p-4 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* Sort by */}
          <div className="">
            <h3 className='text-base border border-slate-300 border-t-0 border-l-0 border-r-0 pb-2 uppercase font-medium text-slate-500'>Sort by</h3>

            <form className='text-sm flex flex-col gap-2 py-3'>
              <div className="flex items-center gap-3">
                <input type="radio" name='sortBy' value={"asc"} checked={sortBy === 'asc'} onChange={handleOnChangeSortBy}/>
                <label htmlFor="">Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="radio" name='sortBy' value={"des"} checked={sortBy === 'des'} onChange={handleOnChangeSortBy}/>
                <label htmlFor="">Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter by */}

          <div className="mt-3">
            <h3 className='text-base border border-slate-300 border-t-0 border-l-0 border-r-0 pb-2 uppercase font-medium text-slate-500'>Category</h3>

            <form className='text-sm flex flex-col gap-2 py-3'>
              {
                productCategory.map((category, index) => {
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <input type='checkbox' name={"category"} value={category.value} checked={selectCategory[category.value]} id={category.value} onChange={handleSelectCategory} />
                      <label htmlFor={category.value}>{category?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>
        </div>

        {/* Product side  */}
        <div className="p-4">

          <p className='px-10 text-lg font-semibold'>Search results: {data.length}</p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {
              data.length !== 0 && !loading && <ProductCardList loading={loading} data={data} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
