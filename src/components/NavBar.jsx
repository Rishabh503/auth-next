"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-xl font-bold">MyApp</h1>

        {/* Links */}
        <div className="space-x-6">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link href="/login" className="hover:text-gray-300 transition">
            Login
          </Link>
          <Link href="/signup" className="hover:text-gray-300 transition">
            Signup
          </Link>
          <Link href="/profile" className="hover:text-gray-300 transition">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}
