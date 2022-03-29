import React from 'react'
import clsx from 'clsx'

const Card = ({ name, headColor = "bg-sky-400", headerClass = "font-bold text-center",className, children }) => {
  return (
    <div className={clsx("w-full rounded-lg border border-gray-300 shadow-md overflow-hidden", className)}>
      <h2 className={clsx("px-2 py-4 text-white text-2xl ", headerClass, headColor)}>
        {name}
      </h2>
      <ul className="my-2">
         {children}
      </ul>
    </div>
  )
}

const Item = ({ className, children, active }) => {
  return (
    <li
      className={clsx("flex justify-between px-3 py-2 hover:bg-gray-100", className, {
        "bg-gray-200": active,
        "hover:bg-gray-200": active
      })}
    >
      {children}
    </li>
  )
}

Card.Item = Item;

export default Card