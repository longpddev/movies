import React, { useState, useEffect } from 'react'

import { DatePicker, LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterMoment'
import { TextField } from '@mui/material'
import moment from 'moment'
const ReleaseDatesFilter = ({ state, dispatch }) => {
  const [dateFrom, setDateFrom] = useState(null)
  const [dateTo, setDateTo] = useState(new moment())

  useEffect(() => {
    if (!dateFrom || !dateTo) return

    dispatch({
      type: 'addFilter',
      value: {
        'primary_release_date.gte': dateFrom.format('YYYY-MM-DD'),
        'primary_release_date.lte': dateTo.format('YYYY-MM-DD'),
      },
    })
  }, [dateFrom, dateTo])
  return (
    <>
      <p className="text-md text-gray-600 font-light pb-3">Release Dates</p>
      <div className="mb-4 ">
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label="From"
            value={dateFrom}
            onChange={(val) => setDateFrom(val)}
            renderInput={(params) => (
              <TextField
                sx={{
                  width: '100%',
                }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </div>
      <div className="mb-4">
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label="To"
            value={dateTo}
            onChange={(val) => setDateTo(val)}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                }}
              />
            )}
          />
        </LocalizationProvider>
      </div>
    </>
  )
}

export default ReleaseDatesFilter
