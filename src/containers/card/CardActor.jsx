import clsx from "clsx"
import React from "react"
import { NavLink } from "react-router-dom"
import { Image } from '../utilities'
const CardActor = ({ data, className }) => {
  return (
    <div
      className={clsx(
        "shadow-md overflow-hidden border border-gray-200 rounded-md",
        className
      )}
    >
      <div className="max-w-[175px] w-full">
        <Image
          src={data?.profile_path}
          ratio={150}
          alt="Actor"
        />
      </div>

      <div className="p-2">
        <NavLink to={`/person/${data.id}`}>
          <p className="font-bold text-md">{data.name}</p>
        </NavLink>
        <p className="text-sm m-0 limit-line-1">{data.character}</p>
      </div>
    </div>
  )
}

export default CardActor
