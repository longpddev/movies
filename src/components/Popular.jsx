import React, { useState, memo } from "react"
import { motion } from "framer-motion"
import clsx from "clsx"
import LoadingIcons from "react-loading-icons"
import CardMovie from "../containers/card/CardMovie"
import CardTvShow from "../containers/card/CardTvShow"
import Fetching from '../components/Fetching'

import {
  useGetMoviesQuery,
  useGetTvShowQuery,
  TRENDING_TYPE,
} from "../services/movieApi"

const ListCard = memo(({ data, mediaType }) => (
  <div className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 ssm:grid-cols-2 grid-cols-1 gap-4 ">
    {data?.results?.map((item, index) => (
      item.media_type === 'movie' || mediaType === "movie" ? (
        <CardMovie
          data={item}
          key={item.id}
        />
      ) : (
        <CardTvShow
          data={item}
          key={item.id}
        />
      )
    ))}
  </div>
))
const filters = {
  tvShow: "On TV",
  movies: "In Theatres",
}
const Popular = ({ className }) => {
  const [filter, setFilter] = useState("tvShow")
  const { data: tvShow } = useGetTvShowQuery({
    type: "popular"
  })
  const { data: movies } = useGetMoviesQuery({
    type: "popular"
  })

  const data = filter === 'movies' ? movies : tvShow;
  return (
    <div className={clsx("c-container", className)}>
      <div className="flex mb-5">
        <h3 className="text-2xl font-bold mr-5">What's Popular</h3>
        <div className="flex border border-gray-600 rounded-full">
          {Object.keys(filters).map((key) => (
            <button
              key={key}
              className="bg-white outline-0 border-0 py-1 px-5 relative bg-transparent"
              onClick={() => setFilter(key)}
            >
              {filter === key && (
                <div
                  className="absolute inset-0 rounded-3xl w-full bg-cyan-900 z-[-1]"
                ></div>
              )}
              <span
                className={clsx("z-[2] font-bold", {
                  "text-cyan-400": filter === key,
                })}
              >
                {filters[key].toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>
      <Fetching
        isFetching={!data?.results}
        data={data?.results?.length > 0}
        render={() => (
            <ListCard
              mediaType={filter}
              data={data}
            />
          )}
      />

    </div>
  )
}

export default Popular
