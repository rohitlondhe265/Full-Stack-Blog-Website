import React from 'react'
import { useState } from 'react'
import axios from "../axios"
import {useNavigate} from "react-router-dom"

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post("/auth/register/", inputs);
      navigate("/login")
    } catch (error) {
      setError(error.response.data);
    }
  }
  console.log(inputs);
  console.log(error);

  return (
    <div className="relative flex h-screen w-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl font-light ">Register for new account</span>
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-2 bg-purple-400 rounded-t-md"></div>
          <div className="px-8 py-6 ">

            <label className="block mt-3 font-semibold"> Username </label>
            <input required onChange={handleChange} name="username" type="text" placeholder="Username" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
            <label className="block mt-3  font-semibold"> Email </label>
            <input required onChange={handleChange} name="email" type="email" placeholder="Email" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
            <label className="block mt-3 font-semibold"> Password </label>
            <input required onChange={handleChange} name="password" type="password" placeholder="Password" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />

            <div className="flex flex-col justify-center items-center">
              <button type="submit" onClick={handleSubmit} className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Register</button>
              {error && <p className='text-sm text-red-600 mt-3'>{error}</p>}
              <p className="text-sm hover:underline mt-3 cursor-pointer">Already Have an Account? Login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register