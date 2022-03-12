import React from 'react'
import { motion } from 'framer-motion';

import CardCategory from '../components/CardCategory'
import Collapse from '../components/Collapse';
const Category = () => {
  return (
    <motion.div className="c-container mb-10 pt-10" initial={{ opacity: 0 }} animate={{ opacity: 1}}>
        <h1 className="text-4xl font-medium text-gray-800 mb-5">Category</h1>
        <div className="flex flex-wrap">
            <div className="lg:w-1/5 w-full">
                <Collapse className="mb-3" name="Sort">
                    asdkashdahd
                    klajsdklj
                    lkasjd
                    alksjdkl
                    klajsdkl
                </Collapse>
            </div>
            <div className="lg:w-4/5 w-full lg:pl-10">
            <motion.div className="grid xl:grid-cols-5 sm:grid-cols-3 ssm:grid-cols-2 grid-cols-1 gap-6 " layout>
                {Array(Math.round(Math.random() * 30)).fill(1).map((item, index) => (
                    <motion.div layout>
                        <CardCategory key={index} />
                    </motion.div>
                ))}
            </motion.div>
            <button className="w-full px-4 py-2 bg-sky-600 rounded-md outline-0 border-0 text-xl text-white font-medium mt-4">
                Load More
            </button>
            </div>
        </div>
    </motion.div>
  )
}

export default Category