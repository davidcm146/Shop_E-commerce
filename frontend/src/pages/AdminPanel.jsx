import React, { useEffect } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import {Link, Outlet, useNavigate} from 'react-router-dom'
import ROLE from '../common/role'


const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user)
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.role !== ROLE.ADMIN){
      navigate("/");
    }
  },[user])

  return (
    <div className='min-h-[calc(100vh-200px)] hidden lg:flex'>
      <aside className='bg-white min-h-full w-full max-w-60 custom-shadow'>
        <div className="h-32 flex justify-center flex-col items-center">
          <div className="text-3xl cursor-pointer flex justify-center">
            {
              user?.profileAvatar ? (
                <img src={user?.profileAvatar} alt={user.fullname} className="w-20 h-20 mt-8 rounded-full border-2 border-blue-400" />
              ) : (
                <FaRegCircleUser />
              )
            }
          </div>
          <p className='py-1 capitalize font-semibold text-lg'>{user?.fullname}</p>
          <p className='capitalize text-sm'>{user?.role}</p>
        </div>
        <div className="mt-8">
          <nav className='grid'>
            <Link to={"all-users"} className='px-6 py-3 w-full hover:bg-slate-100 text-lg'>Manage Users</Link>
            <Link to={"all-products"} className='px-6 py-3 w-full hover:bg-slate-100 text-lg'>Manage Products</Link>
          </nav>
        </div>
      </aside>

      <main className='w-full h-full p-4'>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminPanel
