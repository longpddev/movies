import React, { useState, useEffect } from 'react'
import InputKeyword from '../keyword/InputKeyword'

const KeywordFilter = ({ state, dispatch }) => {
  const [value, setValue] = useState([])

  useEffect(() => {
    let toString = value.map((item) => item.id).join(', ')
    if (toString.length > 0) {
      dispatch({
        type: 'addFilter',
        value: {
          with_keywords: toString,
        },
      })
    } else {
      dispatch({
        type: 'removeFilter',
        value: {
          with_keywords: true,
        },
      })
    }
  }, [value])

  return (
    <>
      <p className="text-md text-gray-600 font-light pb-3">Keywords</p>
      <InputKeyword onChange={(value) => setValue(value)} />
    </>
  )
}

export default KeywordFilter
