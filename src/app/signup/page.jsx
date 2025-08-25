"use client"

import React, { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import axios from 'axios'

const SignUpPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })
  const[loading,setLoading]=useState(false)

  const onSignup = async (e) => {
    e.preventDefault()
    try {
      console.log(user) 
      setLoading(true)
      const response=await axios.post("api/users/signup",user)
      console.log("signup done",response.data);
      router.push("/login")
      // you can replace this with API call
    } catch (error) {
      console.log("signup failed",error.message)
      // do this
      //TODO  toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={onSignup} 
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        {!loading?"signup":"processing"}
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600 mb-2">
            Username
          </label>
          <input 
            type="text" 
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-2">
            Email
          </label>
          <input 
            type="email" 
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600 mb-2">
            Password
          </label>
          <input 
            type="password" 
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>
        <div className='flex w-full items-center justify-center '>
          <Link className='p-2 text-blue-400 m-2' href='/login'>
      Already a User?  Login
        </Link>
        </div>
      </form>
      
    </div>
  )
}

export default SignUpPage
