import React, { useState, useMemo, useEffect } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const minDistance = 40;
const step = 15;
const max = 400;
function valuetext(value) {
  return `${value}°C`;
}

const RuntimeFilter = ({ state, dispatch }) => {
  const [value, setValue] = useState([30, 120]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const marks = useMemo(() => {
    return Array(Math.ceil(max / step / 5)).fill(0).map((item, index) => ({
      value: index * step * 5,
      label: index * step * 5,
    }))
  }, []);

  useEffect( () => {
    const [ timeMin, timeMax ] = value;
    dispatch({
      type: 'addFilter',
      value: {
        'with_runtime.gte': timeMin,
        "with_runtime.lte": timeMax
      }
    })
  }, [value]);

  return (
    <>
      <p className="text-md text-gray-600 font-light pb-3">Runtime</p>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        step={15}
        max={max}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        marks={marks}
        disableSwap
      />
    </>
  )
}

export default RuntimeFilter