import React from "react"
import { NavLink } from "react-router-dom"
import Score from "../../components/Score"
import { Image } from '../utilities'
import moment from "moment"
import CardMoreAction from "./CardMoreAction";

queueMicrotask(() => {})

const CardItem = ({
  id,
  image_path,
  score,
  title,
  dateTime
}) => {
  return (
    <div className="h-full relative rounded-lg overflow-hidden">
      <CardMoreAction
        media_id={id}
        type={"movies"}
      />

      <NavLink
        to={`/movie/${id}`}
        className="flex flex-col h-full"
      >
        <div className="relative mb-6">
          <div className="min-h-[225px]">
            <Image
              src={image_path}
              ratio={150}
              alt="image"
            />
          </div>
          <div className="absolute bottom-0 left-2 translate-y-1/2">
            <Score
              size="md"
              score={score * 10}
            />
          </div>
        </div>
        <div className=" flex-1">
          <p>
            <strong>{title}</strong>
          </p>
          <p className="font-light text-gray-600 text-sm">
            {moment(new Date(dateTime)).format("DD MMMM YYYY")}
          </p>
        </div>
      </NavLink>
    </div>
  )
}

const CardMovie = ({ data }) => {
  return (
    <div className="h-full relative rounded-lg overflow-hidden">
      <CardMoreAction
        media_id={data.id}
        type={"movies"}
      />

      <NavLink
        to={`/movie/${data.id}`}
        className="flex flex-col h-full"
      >
        <div className="relative mb-6">
          <div className="min-h-[225px]">
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
