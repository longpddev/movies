import React, { useState, useEffect } from "react"
import { useGetGenresQuery } from "../../services/movieApi"
import Loading from "../../components/Loading"
import clsx from "clsx"
import Tag from '../../components/Tag'

const GenresFilter = ({ action, dispatch }) => {
  const { data, isFetching } = useGetGenresQuery()
  const [selected, setSelected] = useState([])

  useEffect(() => {
    if (!(data?.genres?.length > 0)) return
    setSelected(Array(data.genres.length).fill(0))
  }, [data])

  useEffect(() => {
    let options = selected.filter((item) => item !== 0)
    if (options.length > 0) {
      dispatch({
        type: "addFilter",
        value: {
          with_genres: options.join(", "),
        },
      })
    } else {
      dispatch({
        type: "removeFilter",
        value: {
          with_genres: true,
        },
      })
    }
  }, [selected])

  return (
    <>
      <p className="text-md text-gray-600 font-light pb-3">Genres</p>
      <div className="flex flex-wrap mx-[-0.25rem]">
        {isFetching ? (
          <Loading
            height={32}
            width={32}
          />
        ) : (
          data?.genres?.map((item, index) => (
            <Tag 
              className="mx-1 mb-1"
              key={item.id}
              isSelect={selected[index] === item.id}
              onClick={() => {
              if (item.id === selected[index]) {
                selected[index] = 0
              } else {
                selected[index] = item.id
              }
              setSelected([...selected])
            }}
            >
              {item.name}
            </Tag>
          ))
        )}
      </div>
    </>
  )
}

export default GenresFilter
