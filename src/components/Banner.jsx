import clsx from "clsx"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import banner from "../images/banner.jpg"
const Banner = ({ className }) => {
  const navigate = useNavigate()
  const [text, setText] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/?p=${text}`)
  }
  return (
    <div
      className={clsx("banner c-container relative", className)}
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="py-16 flex items-center">
        <div className="w-full">
          <h1 className="text-white font-bold text-5xl mb-2">Welcome.</h1>
          <h3 className="text-white font-bold text-2xl">
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
          <div className="relative mt-12">
            <form
              action=""
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="hover:shadow-lg focus:shadow-lg rounded-full w-full p-3 pl-6 text-lg border-0 outline-0 pr-24"
                placeholder="Search for a movie, Tv Shows..."
              />
              <button
                className="bg-gradient-to-r from-emerald-400 to-sky-500 block rounded-full py-4 px-6 absolute top-0 right-0 font-bold text-sm text-white"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
