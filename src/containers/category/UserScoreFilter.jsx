import React, { useState, useMemo, useEffect } from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"

const minDistance = 10
const step = 10
const max = 100

const UserScoreFilter = ({ state, dispatch }) => {
  const [value, setValue] = useState([40, 100])

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
    }
  }

  const marks = useMemo(() => {
    return Array(Math.ceil(max / step / 2))
      .fill(0)
      .map((item, index) => ({
        value: index * step * 2,
        label: index * step * 2,
      }))
  }, [])

  useEffect(() => {
    const [voteMin, voteMax] = value
    dispatch({
      type: "addFilter",
      value: {
        "vote_average.gte": voteMin / 10,
        "vote_average.lte": voteMax / 10,
      },
    })
  }, [value])

  return (
    <>
      <p className="text-md text-gray-600 font-light pb-3">User Score</p>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value}
        step={step}
        max={max}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks={marks}
        disableSwap
      />
    </>
  )
}

export default UserScoreFilter
