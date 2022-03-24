import React, { useCallback } from 'react'
import { Select, MenuItem } from '@mui/material'
import Collapse from '../../components/Collapse'

const SortFilter = ({ state, dispatch }) => {
  const options = [
    'popularity.asc',
    'popularity.desc',
    'release_date.asc',
    'release_date.desc',
    'revenue.asc',
    'revenue.desc',
    'primary_release_date.asc',
    'primary_release_date.desc',
    'original_title.asc',
    'original_title.desc',
    'vote_average.asc',
    'vote_average.desc',
    'vote_count.asc',
    'vote_count.desc',
  ]
  const defaultValue = state?.sort_by || options[0]
  const getLabel = useCallback(
    (text) =>
      text
        .replaceAll('_', '.')
        .split('.')
        .map((t) => {
          t = t.replace(t[0], t[0].toUpperCase())
          return t
        })
        .join(' '),
    []
  )
  return (
    <Select
      value={defaultValue}
      onChange={(e) =>
        dispatch({
          type: 'addFilter',
          value: {
            sort_by: e.target.value,
          },
        })
      }
      className="w-full"
    >
      {options.map((item, index) => (
        <MenuItem key={index} value={item}>
          {getLabel(item)}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SortFilter
