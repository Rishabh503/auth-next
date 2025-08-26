"use client"


import { useUser } from "@/context/userContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddLinkForm() {
  const router=useRouter()
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const {user}=useUser()
    console.log(user);
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
          const response=await axios.post('/api/links/create',{
            url,
            title,
            notes,
            userId:user._id
          }) 
          console.log(response)
            console.log("creation success",response.data)
      toast.success(response.data.message)
      router.push('/links')

        } catch (error) {
           toast.error(error.response.data.error)
      console.log("login failed",error)
        }
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add New Link
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Enter link title"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              URL
            </label>
            <input
              type="url"
              placeholder="https://example.com"
                value={url}
              onChange={(e)=>setUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Notes
            </label>
            <input
              type="text"
              placeholder="you may add a random thought "
                value={notes}
              onChange={(e)=>setNotes(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Link
          </button>
        </form>
      </div>
    </div>
  );
}
