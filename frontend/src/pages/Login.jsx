import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginIcon from "../assest/signin.gif"
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import summaryURL from '../common';
import { toast } from 'react-toastify';
import Context from '../context/AuthContext';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState(
        {
            email: "",
            password: ""
        }
    );
    const navigate = useNavigate();
    const { fetchDetailUser, fetchCountProductInCart } = useContext(Context);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(summaryURL.signIn.url, {
            method: summaryURL.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const result = await dataResponse.json();
        if (result.success) {
            toast.success(result.message);
            fetchDetailUser();
            fetchCountProductInCart();
            navigate("/")
        }
        else {
            toast.error(result.message);
        }
    }

    return (
        <section id='login' className="flex items-center container">
            <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                <div className="w-28 h-28 text-xl text-center uppercase mb-4 relative overflow-hidden rounded-full mx-auto">
                    <div className="">
                        <img src={loginIcon} alt="" className='bg-white mx-auto' />
                    </div>
                </div>
                <form className="mb-4 mt-6" method="post" onSubmit={handleSubmit}>
                    <div className="mb-4 md:w-full ">
                        <label htmlFor="email" className="block text-sm mb-1">Email</label>
                        <input className="h-full w-full border rounded p-2 outline-none focus:shadow-outline "
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            id="email"
                            placeholder="Email" />
                    </div>
                    <div className="mb-3 md:w-full">
                        <label htmlFor="password" className="block text-sm mb-1">Password</label>
                        <div className="flex relative">
                            <input className="w-full border rounded p-2 outline-none focus:shadow-outline"
                                type={showPassword ? "text" : "password"}
                                value={data.password}
                                name="password"
                                id="password"
                                onChange={handleChange}
                                placeholder="Password" />
                            <div className="absolute left-72 top-3 cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                                <span>
                                    {
                                        showPassword ? (
                                            <FaEyeSlash />
                                        ) :
                                            (
                                                <IoEyeSharp />
                                            )
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right ">
                        <Link to={"/forgot-password"} className="text-blue-700 text-center text-sm w-fit hover:underline hover:text-red-500" href="/login">Forgot password ?</Link>
                    </div>
                    <div className="text-center mt-3">
                        <button className="bg-blue-500 w-28 hover:bg-green-700 text-white uppercase max-w-[150px] hover:scale-110 transition-all text-sm font-semibold px-4 py-2 rounded-full">Login</button>
                    </div>
                </form>
                <div className="text-center">

                    <p className='my-3'> Don't have any account ? <Link to={"/sign-up"} className="text-red-500 hover:text-red-700">Sign up</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Login
