import clsx from "clsx"
import React from "react"
import { NavLink } from "react-router-dom"
import { Image } from '../utilities'
import moment from "moment"

const CardFull = ({ data, className }) => {
  return (
    <div className={clsx("card-list", className)}>
      <NavLink
        className="flex"
        to={`/movie/${data.id}`}
      >
        <Image
          src={data.poster_path}
          size={200}
          alt=""
          className="h-full max-h-[145px]"
        />
        <div className="p-3 flex flex-col justify-between">
          <div>
            <p className="text-xl">
              <strong>{data.title}</strong>
            </p>
            <p className="text-gray-400 text-sm">
              {moment(new Date(data.release_date)).format("DD MMMM YYYY")}
            </p>
          </div>
          <p className="text-sm limit-line-2">{data.overview}</p>
        </div>
      </NavLink>
    </div>
  )
}

export default CardFull
