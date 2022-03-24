import React, { useState, useEffect } from 'react'
import { useGetGenresQuery } from '../../services/movieApi'
import Loading from '../../components/Loading'
import clsx from 'clsx'
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
        type: 'addFilter',
        value: {
          with_genres: options.join(', '),
        },
      })
    } else {
      dispatch({
        type: 'removeFilter',
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
          <Loading height={32} width={32} />
        ) : (
          data?.genres?.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === selected[index]) {
                  selected[index] = 0
                } else {
                  selected[index] = item.id
                }

                setSelected([...selected])
              }}
              className={clsx(
                'border border-gray-300 rounded-full px-3 py-0.5 text-sm hover:border-sky-400 pointer mx-1 mb-1',
                {
                  'border-sky-400': selected[index] === item.id,
                  'bg-sky-400': selected[index] === item.id,
                  'text-white': selected[index] === item.id,
                  'hover:text-sky-400 ': selected[index] !== item.id,
                }
              )}
            >
              {item.name}
            </button>
          ))
        )}
      </div>
    </>
  )
}

export default GenresFilter
