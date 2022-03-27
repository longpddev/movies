import React, { useMemo, useState } from "react"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

import ListTable from "./ListTable"
import { useGetPersonDetailQuery } from "../../services/movieApi"
import Fetching from "../../components/Fetching"

const creditsType = [
  {
    name: "All",
    val: "combined_credits",
  },
  {
    name: "TV Shows",
    val: "tv_credits",
  },
  {
    name: "Movies",
    val: "movie_credits",
  },
]

const PersonActivity = ({ idPerson }) => {
  const [credits, setCredits] = useState(creditsType[0])
  const { data, isFetching } = useGetPersonDetailQuery(
    {
      id: idPerson,
      type: credits.val,
    },
    {
      skip: !idPerson,
    }
  )

  const groupCastByYear = useMemo(() => {
    if (!(data?.cast?.length > 0)) return {}

    let resultYear = {}
    data.cast.map((item) => {
      let year = item?.release_date
      if (!year) {
        year = "__"
      } else {
        year = new Date(year).getFullYear()
      }
      if (typeof resultYear[year] === "undefined") resultYear[year] = []
      resultYear[year].push(item)
    })

    return resultYear
  }, [data])

  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <span className="text-xl font-semibold">Acting</span>
        <ul className="flex space-x-3">
          <li className="relative flex items-center space-x-1 dropdown">
            <span>{credits.name}</span>
            <ArrowDropDownIcon />
            <ul className="dropdown-option right-0 ">
              {creditsType.map(
                (item) =>
                  item.val !== credits.val && (
                    <li key={item.val}>
                      <button
                        onClick={() => setCredits(item)}
                        className="px-3 py-1 hover:bg-gray-100 pointer rounded-md w-full text-left min-w-[150px] text-sm"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
            </ul>
          </li>
        </ul>
      </div>
      <div className="mt-3">
        <Fetching
          isFetching={isFetching}
          data={data}
          render={() => <ListTable group={groupCastByYear} />}
        />
      </div>
    </div>
  )
}

export default PersonActivity
