import React, { useState, memo } from "react"
import { motion } from "framer-motion"
import clsx from "clsx"
import LoadingIcons from "react-loading-icons"
import CardMovie from "../containers/card/CardMovie"
import CardTvShow from "../containers/card/CardTvShow"
import {
  useGetTrendingQuery,
  TRENDING_TYPE,
} from "../services/movieApi"
import Fetching from "./Fetching"
import ListCard from "./ListCard"

const Trending = ({ className }) => {
  const [filter, setFilter] = useState(TRENDING_TYPE.time_window[0])
  const { data, isFetching } = useGetTrendingQuery(filter)
  return (
    <div className={clsx("c-container", className)}>
      <div className="flex flex-wrap">
        <h3 className="text-2xl  mb-5 font-bold mr-5">Trending</h3>
        <div className=" mb-5 flex border border-gray-600 rounded-full">
          {TRENDING_TYPE.time_window.map((item, index) => (
            <button
              key={index}
              className="bg-white outline-0 border-0 py-1 px-5 relative bg-transparent"
              onClick={() => setFilter(item)}
            >
              {filter === item && (
                <div
                  className="absolute inset-0 rounded-3xl w-full bg-cyan-900 z-[-1]"
                ></div>
              )}
              <span
                className={clsx("z-[2] font-bold", {
                  "text-cyan-400": filter === item,
                })}
              >
                On {item.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>
      <Fetching
        isFetching={isFetching}
        data={data?.results?.length > 0}
        render={() => (
          <ListCard
            data={data}
          />
        )}
      />
    </div>
  )
}

export default Trending
