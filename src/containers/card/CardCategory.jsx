import React from "react"
import { NavLink } from "react-router-dom"
import Score from "./Score"

import imageSamble from "../images/movie1.jpg"
import { Image } from '../utilities'
const CardCategory = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
      <NavLink to="/detail">
        <div className="relative mb-6">
          <Image
            src={imageSamble}
            className="min-h-[225px]"
            alt="image"
          />
          <div className="absolute bottom-0 left-2 translate-y-1/2">
            <Score
              size="md"
              score={Math.round(Math.random() * 100)}
            />
          </div>
        </div>
        <div className="bg-white p-2 pt-0">
          <p className="">
            <strong>After Yang</strong>
          </p>
          <p className="font-light text-gray-600 text-sm">04 Mar 2020</p>
        </div>
      </NavLink>
    </div>
  )
}

export default CardCategory
