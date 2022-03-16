import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

import CardCategory from '../components/CardCategory';
import Card from '../components/Card';
import Collapse from '../components/Collapse';
import { Filter } from '../components/category';
import { useGetDiscoverQuery } from '../services/movieApi';
const Category = () => {
    const [ filter, setFilter ] = useState({});
    const { data, isFetching } = useGetDiscoverQuery({
        type: "movie",
        filter: filter
    }, {
        skip: Object.keys(filter).length === 0
    });
    
    useEffect(() => {
        console.log(data);
    }, [data])
    return (
        <motion.div className="c-container mb-10 pt-10" initial={{ opacity: 0 }} animate={{ opacity: 1}}>
            <h1 className="text-4xl font-medium text-gray-800 mb-5">Category</h1>
            <div className="flex flex-wrap">
                <div className="lg:w-1/5 w-full">
                    <Filter
                        onSearch={(data) => setFilter(data)}
                    /> 
                </div>
                <div className="lg:w-4/5 w-full lg:pl-10">
                <motion.div className="grid xl:grid-cols-5 sm:grid-cols-3 ssm:grid-cols-2 grid-cols-1 gap-6 " layout>
                    {data?.results?.map((data, index) => (
                        <motion.div key={index} layout>
                            <Card key={index} data={data}/>
                        </motion.div>
                    ))}
                </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default Category