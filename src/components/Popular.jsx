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
import ListCard from "./ListCard"

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
      <div className="flex flex-wrap">
        <h3 className="text-2xl  mb-5 font-bold mr-5">What's Popular</h3>
        <div className="flex border  mb-5 border-gray-600 rounded-full">
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
              mediaType={filter === 'movies' ? "movie" : "tv"}
              data={data}
            />
          )}
      />

    </div>
  )
}

export default Popular
