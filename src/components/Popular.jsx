import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Card from './Card'
import clsx from 'clsx'
const Popular = ({ id, className }) => {
  const [filter, setFilter] = useState('tv')

  return (
    <div className={clsx('c-container', className)}>
      <div className="flex mb-5">
        <h3 className="text-2xl font-bold mr-5">What's Popular</h3>
        <div className="flex border border-gray-600 rounded-full">
          <button
            className="bg-white outline-0 border-0 py-1 px-5 relative bg-transparent"
            onClick={() => setFilter('tv')}
          >
            {filter === 'tv' && (
              <motion.div
                className="absolute inset-0 rounded-3xl w-full bg-cyan-900 z-[-1]"
                layoutId={id}
              ></motion.div>
            )}
            <span
              className={clsx('z-[2] font-bold', {
                'text-cyan-400': filter === 'tv',
              })}
            >
              On Tv
            </span>
          </button>
          <button
            className="bg-white outline-0 border-0 py-1 px-5 relative bg-transparent"
            onClick={() => setFilter('theatres')}
          >
            {filter === 'theatres' && (
              <motion.div
                className="absolute inset-0 rounded-3xl w-full bg-cyan-900 z-[-1]"
                layoutId={id}
              ></motion.div>
            )}
            <span
              className={clsx('z-[2] font-bold', {
                'text-cyan-400': filter === 'theatres',
              })}
            >
              In Theatres
            </span>
          </button>
        </div>
      </div>

      <motion.div
        className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 ssm:grid-cols-2 grid-cols-1 gap-4 "
        layout
      >
        {Array(Math.round(Math.random() * 30))
          .fill(1)
          .map((item, index) => (
            <motion.div key={index} layout>
              <Card />
            </motion.div>
          ))}
      </motion.div>
    </div>
  )
}

export default Popular
