import React, { useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import LoadingIcons from "react-loading-icons";
import Card from './Card'
import { useGetTrendingQuery, getImage, TRENDING_TYPE } from '../services/movieApi';

const ListCard = memo(({data}) => (
    <motion.div className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 ssm:grid-cols-2 grid-cols-1 gap-4 " layout>
        <AnimatePresence>
        {data?.results?.map((item, index) => (
            <motion.div 
                key={item.id} 
                layout 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                initial={{ opacity: 0 }}
            >
                <Card data={item} />
            </motion.div>
        ))}
        </AnimatePresence>
    </motion.div>
))

const Trending = ({className}) => {
    const [ filter, setFilter ] = useState(TRENDING_TYPE.time_window[0]);
    const { data, isFetching } = useGetTrendingQuery(filter);

    return (
      <div className={clsx('c-container' ,className)}>
        <div className="flex mb-5">
          <h3 className="text-2xl font-bold mr-5">
            Trending
          </h3>
          <div className="flex border border-gray-600 rounded-full">
              {TRENDING_TYPE.time_window.map((item, index) => (
                  <button key={index} className="bg-white outline-0 border-0 py-1 px-5 relative bg-transparent" onClick={() => setFilter(item)}>
                    {filter === item && (
                        <motion.div className="absolute inset-0 rounded-3xl w-full bg-cyan-900 z-[-1]" layoutId="Trending"></motion.div>
                    )}
                    <span className={clsx('z-[2] font-bold', {
                        'text-cyan-400': filter === item
                    })}>On {item.toUpperCase()}</span>
                </button>
              ))}
          </div>
        </div>
        {isFetching ? (
            <div className="w-full min-h-[300px] flex justify-center items-center">
                <LoadingIcons.BallTriangle stroke="blue" />
            </div> 
        ) : (
            <ListCard data={data} />
        )}
        
      </div>
    )
}

export default Trending