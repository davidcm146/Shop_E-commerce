import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginIcon from "../assest/signin.gif"
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import imageToBase64 from '../helper/imageToBase64';
import {
  validateFullName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../helper/validate';
import summaryURL from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef(null);
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileAvatar: ""
  });

  const navigate = useNavigate();

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    const avatar = await imageToBase64(file);
    setData((prev) => ({
      ...prev,
      profileAvatar: avatar,
    }));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const validateInput = (name, value) => {
    let error = '';
    switch (name) {
      case 'fullname':
        error = validateFullName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(data.password, value);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(name, value);
  };

  const isFormValid = () => {
    return (
      data.fullname &&
      !errors.fullname &&
      data.email &&
      !errors.email &&
      data.password &&
      !errors.password &&
      data.confirmPassword &&
      !errors.confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    Object.keys(data).forEach((field) => validateInput(field, data[field]));

    // Check if form is valid after validation
    if (!isFormValid()) {
      toast.error("Please adjust your information.");
      return;
    }

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(summaryURL.signUp.url, {
        method: summaryURL.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await dataResponse.json();
      if (result.success) {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message);
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
    }
  };

  return (
    <section id='signup' className="flex items-center container">
      <div className="w-full block bg-white shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <div className="w-28 h-28 text-xl text-center uppercase mb-4 relative overflow-hidden rounded-full mx-auto">
          <div>
            <img src={data.profileAvatar || loginIcon} alt="Profile Avatar" className='bg-white mx-auto' />
          </div>
          <form action="">
            <label>
              <div className="text-xs text-center my-4 bg-opacity-80 bg-slate-200 absolute pt-2 -bottom-7 cursor-pointer h-1/2 w-full" onClick={handleButtonClick}>
                Upload avatar
              </div>
              <input
                className='hidden absolute bottom-2 left-0'
                ref={fileInputRef}
                onChange={handleUploadAvatar}
                type='file'
              />
            </label>
          </form>
        </div>
        <form className="mb-4 mt-6 flex-col" method="post" onSubmit={handleSubmit}>
          <div className="mb-4 md:w-full">
            <label htmlFor="fullname" className="block text-sm mb-1">Fullname</label>
            <input
              className="h-full w-full border rounded p-2 outline-none focus:shadow-outline"
              type="text"
              name="fullname"
              value={data.fullname}
              onChange={handleChange}
              id="fullname"
              placeholder="Fullname"
              required
            />
            {errors.fullname && <p className="text-red-500">{errors.fullname}</p>}
          </div>
          <div className="mb-4 md:w-full">
            <label htmlFor="email" className="block text-sm mb-1">Email</label>
            <input
              className="h-full w-full border rounded p-2 outline-none focus:shadow-outline"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              id="email"
              placeholder="Email"
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-3 md:w-full">
            <label htmlFor="password" className="block text-sm mb-1">Password</label>
            <div className="flex relative">
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type={showPassword ? "text" : "password"}
                value={data.password}
                name="password"
                id="password"
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <div className="absolute left-72 top-3 cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
              </div>
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <div className="mb-3 md:w-full">
            <label htmlFor="confirm-password" className="block text-sm mb-1">Confirm password</label>
            <div className="flex relative">
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type={showConfirmPassword ? "text" : "password"}
                value={data.confirmPassword}
                name="confirmPassword"
                id="confirm-password"
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
              <div className="absolute left-72 top-3 cursor-pointer" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? <FaEyeSlash /> : <IoEyeSharp />}
              </div>
            </div>
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
          </div>
          <div className="text-center mt-5">
            <button
              disabled={!isFormValid()}
              className="bg-blue-500 w-28 hover:bg-green-700 text-white uppercase max-w-[150px] hover:scale-110 transition-all text-sm font-semibold px-4 py-2 rounded-full"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className='my-3'>Already have an account? <Link to={"/login"} className="text-red-500 hover:text-red-700">Login</Link></p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
