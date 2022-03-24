import clsx from 'clsx'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { getImage } from '../services/movieApi'

const CardActor = ({ data, className }) => {
  return (
    <div
      className={clsx(
        'shadow-md overflow-hidden border border-gray-200 rounded-md',
        className
      )}
    >
      <img
        src={getImage(data?.profile_path, 200)}
        alt="Actor"
        className="min-h-[175px] w-full"
      />
      <div className="p-2">
        <NavLink to="/actor">
          <p className="font-bold text-md">{data.name}</p>
        </NavLink>
        <p className="text-sm m-0 limit-line-1">{data.character}</p>
      </div>
    </div>
  )
}

export default CardActor
