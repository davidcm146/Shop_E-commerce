import React, { useContext, useEffect, useState } from 'react';
import Logo from './Logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import summaryURL from '../common';
import { setUserDetail } from '../store/userSlice';
import ROLE from '../common/role'
import Context from '../context/AuthContext';

const Header = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const dataResponse = await fetch(summaryURL.logout.url, {
      method: summaryURL.logout.method,
      credentials: 'include',
    })

    const result = await dataResponse.json();
    if (result.success) {
      toast.success(result.message);
      dispatch(setUserDetail(null));
      navigate("/")
    }
    else {
      toast.error(result.message);
    }
  }

  const handleSearch = (e) => {
    const {value} = e.target
    setSearch(value)
    if (value){
      navigate(`/search?q=${value}`);
    }
    else{
      navigate("/")
    }
  }

  return (
    <header className="h-16 shadow-md bg-white w-full fixed z-40">
      <div className="h-full container mx-auto flex items-center px-7 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="w-96 hidden lg:block ml-7">
          <form className="max-w-sm">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoIosSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input onChange={handleSearch}
              value={search}
              type="search" 
              id="default-search" 
              className="shadow-sm h-12 block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Search products ..." 
              required />
              
            </div>
          </form>

        </div>

        <div className="flex items-center gap-6 mr-7">
          <div className="relative flex justify-center group">
            {
              user && (
                <div className="text-3xl cursor-pointer">
                  {
                    user?.profileAvatar ? (
                      <img src={user?.profileAvatar} alt={user.fullname} className="w-10 h-10 rounded-full border-2 border-blue-400" />
                    ) : (
                      <FaRegCircleUser />
                    )
                  }
                </div>
              )
            }
            <div className="absolute inset-0 w-full h-10 bg-transparent group-hover:block"></div>
            {user?.role === ROLE.ADMIN && (
              <div className="absolute top-10 h-fit p-2 bg-white shadow-lg rounded hidden group-hover:block">
                <nav>
                  <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hover:bg-slate-200 p-2 w-full h-full rounded md:block'>Admin panel</Link>
                </nav>
              </div>)}



          </div>
          {
            user && (
              <Link to={"/cart"} className="text-3xl relative">
                <span><FaShoppingCart /></span>
                <div className="absolute top-3 -right-4 bg-red-600 text-white w-5 p-1 flex items-center justify-center rounded-full">
                  <p className="text-xs">{context?.cartProductCount > 0 ? context?.cartProductCount : 0}</p>
                </div>
              </Link>
            )
          }


          <div className="mt-2 ml-2">
            {
              user ? (

                <button onClick={handleLogout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 mr-0">Logout</button>
              ) : (
                <Link to={"/login"}>
                  <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 mr-0">Login</button>
                </Link>)
            }

          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
