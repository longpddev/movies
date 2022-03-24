import React, { useState, useMemo, useEffect } from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

const minDistance = 50
const step = 50
const max = 500

const UserVotesFilter = ({ state, dispatch }) => {
  const [value, setValue] = useState(40)

  const marks = useMemo(() => {
    return Array(Math.ceil(max / step / 2))
      .fill(0)
      .map((item, index) => ({
        value: index * step * 2,
        label: index * step * 2,
      }))
  }, [])

  useEffect(() => {
    dispatch({
      type: 'addFilter',
      value: {
        'vote_count.gte': value,
      },
    })
  }, [value])

  return (
    <>
      <p className="text-md text-gray-600 font-light pb-3">
        Minimum User Votes
      </p>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        step={step}
        max={max}
        onChange={(e, value) => setValue(value)}
        valueLabelDisplay="auto"
        marks={marks}
        disableSwap
      />
    </>
  )
}

export default UserVotesFilter
