import React from "react"
import { NavLink } from "react-router-dom"
import Score from "../../components/Score"

import { Image } from '../utilities'
import moment from "moment"
const CardTvShow = ({ data }) => {
  return (
    <div className="h-full">
      <NavLink
        to={`/tv/${data.id}`}
        className="flex flex-col h-full"
      >
        <div className="relative mb-6">
          <Image
            src={data.poster_path}
            className="rounded-lg min-h-[225px]"
            alt="image"
          />
          <div className="absolute bottom-0 left-2 translate-y-1/2">
            <Score
              size="md"
              score={data.vote_average * 10}
            />
          </div>
        </div>
        <div className=" flex-1">
          <p>
            <strong>{data.name}</strong>
          </p>
          <p className="font-light text-gray-600 text-sm">
            {moment(new Date(data.release_date)).format("DD MMMM YYYY")}
          </p>
        </div>
      </NavLink>
    </div>
  )
}

export default React.memo(CardTvShow)
