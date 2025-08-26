"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [loading,setLoading]=useState(false)
  const onLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const response=await axios.post("api/users/login",user);
      console.log("login success",response.data)
      toast.success(response.data.message)
      router.push('/profile')
    } catch (error) {
      toast.error(error.response.data.error)
      console.log("login failed",error)
    }finally{
      setLoading(false)
    }
  }
  const [buttonDisabled, setButtonDisabled] = useState(false)
  //add validations through useEffect
  useEffect(()=>{
    
    if(user.email.length>0 && user.password.length>0 && user.email.length>0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true)
    }
  },[user])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={onLogin} 
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login
        </h2>

        

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
          <Link className='p-2 text-blue-400 m-2' href='/signup'>
      New User?  Signup
        </Link>
        </div>
      </form>
      
    </div>
  )
}

export default LoginPage
