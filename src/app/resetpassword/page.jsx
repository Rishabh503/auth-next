"use client"
import axios from 'axios'
import React, { useState } from 'react'

const ResetPassPage = () => {
  const [email, setEmail] = useState("")
  const [disableButton, setDisableButton] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")

  const onConfirm = async (e) => {
    e.preventDefault() // ❗ prevent page refresh
    setDisableButton(true)

    try {
      const response = await axios.post('/api/users/resetpasswordemail', { email })
      setResponseMessage(response.data.message)
    } catch (error) {
      setResponseMessage(error.response?.data?.error || "Something went wrong")
    } finally {
      setDisableButton(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={onConfirm} 
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Reset Password
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-2">
            Email
          </label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button 
          disabled={disableButton}
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
        >
          {disableButton ? "Sending..." : "Reset"}
        </button>
      </form>

      <div>
        <p className='text-red-500 p-4 font-semibold text-lg text-center'>
          {responseMessage}
        </p>
      </div>
    </div>
  )
}

export default ResetPassPage
