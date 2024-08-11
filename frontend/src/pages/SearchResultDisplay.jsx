import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import summaryURL from '../common';
import ProductCardList from '../components/ProductCardList';

const SearchResultDisplay = () => {
    const query = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchSearchResult = async () => {
        setLoading(true);
        const response = await fetch(summaryURL.searchProduct.url + query.search, {
            method: summaryURL.searchProduct.method
        })
        const result = await response.json();
        setData(result.data);
        setLoading(false);
        console.log(result)
    }

    useEffect(() => {
        fetchSearchResult();
    }, [query])
    return (
        <div className='container p-4 mx-auto'>
            {
                loading && (
                    <div className='text-lg text-center'>
                        Loading .... 
                    </div>

                )
            }
            <p className='my-4 px-10 text-lg font-semibold'>Search results: {data.length}</p>

            {
                data.length === 0 && !loading && (
                    <p className='bg-white text-lg text-center p-4'>No product found</p>
                )
            }

            {
                data.length !== 0 && !loading && (
                    <ProductCardList loading={loading} data={data}/>
                )
            }
        </div>
    )
}

export default SearchResultDisplay
