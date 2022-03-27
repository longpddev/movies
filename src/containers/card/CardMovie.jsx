import React from "react"
import { NavLink } from "react-router-dom"
import Score from "../../components/Score"

import { Image } from '../utilities'
import moment from "moment"
const CardMovie = ({ data }) => {
  return (
    <div className="h-full">
      <NavLink
        to={`/movie/${data.id}`}
        className="flex flex-col h-full"
      >
        <div className="relative mb-6">
          <div className="rounded-lg min-h-[225px]">
            <Image
              src={data.poster_path}
              ratio={150}
              alt="image"
            />
          </div>
          <div className="absolute bottom-0 left-2 translate-y-1/2">
            <Score
              size="md"
              score={data.vote_average * 10}
            />
          </div>
        </div>
        <div className=" flex-1">
          <p>
            <strong>{data.title}</strong>
          </p>
          <p className="font-light text-gray-600 text-sm">
            {moment(new Date(data.release_date)).format("DD MMMM YYYY")}
          </p>
        </div>
      </NavLink>
    </div>
  )
}

export default React.memo(CardMovie)
