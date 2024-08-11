import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import summaryURL from '../common';
import { toast } from 'react-toastify';

const EditUsers = ({
  id, fullname, email, role, onClose, calFunc
}) => {
  const [inforUser, setInfoUser] = useState({ id: id, fullname: fullname, email: email });

  const handleChangeInfoUser = (e) => {
    const { name, value } = e.target;
    setInfoUser((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const updateInfoUser = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(summaryURL.updateUsers.url + `/${id}`, {
      method: summaryURL.updateUsers.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(inforUser)
    })

    const result = await dataResponse.json();
    if (result.success) {
      toast.success(result.message);
      onClose();
      calFunc();
    }
    else {
      toast.error(result.message);
    }
    //   console.log(result.data);
  }
  return (
    // openModal &&

    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
        <div onClick={onClose} className="text-xl float-right cursor-pointer text-gray-500 hover:text-gray-700">
          <IoMdClose />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit User</h1>
        <form className="">
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={inforUser.fullname}
              id="fullname"
              name="fullname"
              onChange={handleChangeInfoUser}
              className="bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition ease-in-out duration-150"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={inforUser.email}
              id="email"
              name="email"
              onChange={handleChangeInfoUser}
              className="bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition ease-in-out duration-150"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <input
              type="text"
              value={role}
              id="role"
              name="role"
              disabled={true}
              className="bg-gray-200 border border-gray-300 text-gray-500 rounded-lg block w-full p-3"
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={updateInfoUser}
              className="bg-blue-600 text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-blue-700 transition ease-in-out duration-150"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default EditUsers
