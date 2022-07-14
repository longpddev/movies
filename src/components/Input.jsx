import React from 'react'

const Input = ({
    className = '',
    ...props
}) => {
  return (
    <input
      className={`${className} border w-full outline-0 border-gray-200 px-3 py-2 rounded-md focus:border-sky-400 focus:shadow-md`}
      {...props}
    />
  )
}

export default Input