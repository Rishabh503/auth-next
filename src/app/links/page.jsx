"use client"
import { useUser } from "@/context/userContext"
import { useEffect, useState } from "react"

export default function LinksGrid() {
  const [links, setLinks] = useState([])
  const {user,loading}=useUser()
  console.log(user)
  
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch("/api/links/all")
        const data = await res.json()
        console.log("bhai konsi ,",data)
        setLinks(data.links || [])
        console.log("yeyy",data.data.links)
      } catch (err) {
        console.error("Failed to fetch links:", err)
      }
    }
    fetchLinks()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        All Links
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white shadow-md rounded-2xl hover:shadow-xl transition-all border border-gray-100 hover:border-purple-300"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              {link.title || `Link ${index + 1}`}
            </h2>
            <p className="text-sm text-gray-500 truncate">{link.url}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
