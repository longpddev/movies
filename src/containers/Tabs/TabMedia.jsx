import React, { useState } from 'react'
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useGetMoviesQuery } from '../../services/movieApi';

const TabMedia = ({ movieId }) => {
  const [tabActive, setTabActive] = useState(0);
  const { data, isFetching } = useGetMoviesQuery({})
  return (
    <div className="my-8">
      <div className="mb-3 flex">
        <h3 className="text-xl mr-6  py-1">Media</h3>
        <ul>
          <li>
            <button className={clsx('bg-transparent py-2 px-3 font-bold relative', {
              'text-sky-600': tabActive === 0
            })} onClick={() => setTabActive(0)}>
              Reviews
              <span className="ml-1 text-gray-500 font-light">0</span>
              {tabActive === 0 && (
                <motion.div
                  className="absolute top-full left-0 h-0.5 bg-sky-600 w-full"
                  layoutId="TabMedia"
                ></motion.div>
              )}
            </button>
            <button className={clsx('bg-transparent py-2 px-3 font-bold relative', {
              'text-sky-600': tabActive === 1
            })} onClick={() => setTabActive(1)}>
              Reviews
              <span className="ml-1 text-gray-500 font-light">0</span>
              {tabActive === 1 && (
                <motion.div className="absolute top-full left-0 h-0.5 bg-sky-600 w-full" layoutId="TabMedia"></motion.div>
              )}
            </button>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  )
}

export default TabMedia