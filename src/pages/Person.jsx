import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { Pagination } from "@mui/material"

import { useGetPersonQuery, getImage } from "../services/movieApi"
import Loading from "../components/Loading"
import { Image } from '../containers/utilities'

const Person = () => {
  const [page, setPage] = useState(1)
  const { data, isFetching } = useGetPersonQuery({
    type: "popular",
    page: page,
  })
  return (
    <div className="c-container mb-10 pt-10">
      <h1 className="text-2xl font-bold mb-4">Popular People</h1>
      {isFetching ? (
        <Loading />
      ) : data?.results?.length > 0 ? (
        <>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 ">
            {data.results.map((item) => (
              <NavLink
                to={`/person/${item.id}`}
                key={item.id}
              >
                <div className="h-full relative transition hover:bottom-1 flex flex-col shadow-md border border-gray-300 rounded-sm hover:shadow-lg">
                  <Image
                    src={item.profile_path}
                    title={item.name}
                    alt={item.name}
                    ratio={150}
                    width="100%"
                    height="270"
                    className="object-cover block w-full "
                  />
                  <div className="px-3 py-2 bg-white h-full">
                    <p className="font-bold text-xl">{item.name}</p>
                    <p className="text-gray-400 text-sm limit-line-1">
                      {item?.known_for
                        ?.map((i) => i.original_title)
                        .filter((i) => i?.length > 0)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
          <Pagination
            className="max-w-max mx-auto mt-4"
            count={data.total_pages > 500 ? 500 : data.total_pages}
            page={data.page}
            onChange={(_, page) => setPage(page)}
          />
        </>
      ) : (
        <h2 className="text-center text-2xl font-bold">Not found...</h2>
      )}
    </div>
  )
}

export default Person
