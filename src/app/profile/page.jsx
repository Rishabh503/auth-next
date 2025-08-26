"use client"

import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function Profile() {
  const router = useRouter()
  const [data, setData] = useState({})
  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout successful")
      router.push("/login")
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed")
    }
  }

  const getUserDetails=async()=>{
    const res=await axios.get('api/users/me')
  
    console.log(res.data.data)
    setData(res.data.data)
    console.log(data)
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm text-center">
        <h2>
          {data==='nothing'|| 'NOTHING'?"click me ":"not click me"}
         <Link href={`/profile/${data._id}`}>
         Go to profile
         </Link>
        </h2>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Do you want to log out?
        </h2>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          My Profile
        </button>
        
      </div>
    </div>
  )
}
