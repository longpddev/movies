import React from 'react'
import clsx from 'clsx'

const Tag = ({ isSelect = false, children, className, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        className,
        "border border-gray-300 rounded-full px-3 py-0.5 text-sm hover:border-sky-400 pointer",
        {
          "border-sky-400": isSelect,
          "bg-sky-400": isSelect,
          "text-white": isSelect,
          "hover:text-sky-400 ": !isSelect,
        }
      )}
    >
      {children}
    </button>
  )
}

export default Tag