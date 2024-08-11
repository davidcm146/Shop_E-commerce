import React, { useEffect, useState, useRef } from 'react'
import summaryURL from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdEdit } from "react-icons/md";
import EditUsers from '../components/EditUsers';

const AllUsers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({
    _id: "",
    email: "",
    fullname: "",
    role: ""
});
  const fetchAllUsers = async () => {
    const dataResponse = await fetch(summaryURL.allUsers.url, {
      method: summaryURL.allUsers.method,
      credentials: 'include',
    })
    const result = await dataResponse.json();
    if (result.success) {
      setAllUsers(result.data);
      console.log(result.data);
    }
    else {
      toast.error(result.message);
    }
  }

  useEffect(() => {
    fetchAllUsers();

  }, [])
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Date created
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr
              key={index}
              className="bg-white border-b hover:bg-blue-50"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <div className="text-base font-semibold p-3">{index + 1}</div>
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={user?.profileAvatar}
                  alt={`${user?.fullname}'s profile`}
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">{user?.fullname}</div>
                  <div className="font-normal text-gray-500">{user?.email}</div>
                </div>
              </th>
              <td className="px-6 py-4 font-semibold">{user?.role}</td>
              <td className="py-4 font-semibold">
                {moment(user?.createdAt).format('DD/MM/yyyy, HH:mm:ss')}
              </td>
              <td className="px-8 py-4">
                <button onClick={() => {setOpenModal(true); setUpdatedUser(user)}} className='text-lg text-black p-2 rounded-full bg-slate-300 hover:bg-slate-200 hover:text-white'><MdEdit /></button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      {
        openModal && <EditUsers fullname={updatedUser.fullname} calFunc={fetchAllUsers} onClose={()=>setOpenModal(false)} id={updatedUser._id} email={updatedUser.email} role={updatedUser.role}/>

      }
      

    </div>



  )
}

export default AllUsers
