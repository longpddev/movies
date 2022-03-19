import React, { useEffect, useState, useReducer } from 'react'
import { motion } from 'framer-motion';
import Pagination from '@mui/material/Pagination';

import Card from '../components/Card';
import { useGetDiscoverQuery } from '../services/movieApi';
import Loading from '../components/Loading';
import { Filter } from '../containers/category';

const initialState = {
    sort_by: 'popularity.desc',
    page: 1
};

/**
 * 
 * @param {*} state type and key value
 * @param {*} action type, value { key: value}
 * @returns 
 */
function reducer(state, action) {
    switch (action.type) {
        case 'addFilter':
            return {
            ...state,
            ...action.value
            };
        case 'removeFilter':
            const newState = {...state};
            for(let key of Object.keys(action.value)) {
            if(typeof newState[key] === 'undefined') continue; 
            delete newState[key];
            }
            
            return newState;
        default:
            throw new Error();
    }
}

const Category = ({discover = "movie"}) => {
    const [ filter, setFilter ] = useState({});
    const [state, dispatch] = useReducer(reducer, initialState);
    const { data, isFetching } = useGetDiscoverQuery({
        type: discover,
        filter: filter
    }, {
        skip: Object.keys(filter).length === 0
    });
    
    useEffect(() => {
        setFilter(state);
    }, [state.page]);

    return (
        <motion.div className="c-container mb-10 pt-10" initial={{ opacity: 0 }} animate={{ opacity: 1}}>
            <h1 className="text-4xl font-medium text-gray-800 mb-5">Category</h1>
            <div className="flex flex-wrap">
                <div className="xl:w-1/5 w-full lg:w-1/4 mb-8 lg:mb-0">
                    <Filter
                        onSearch={() => setFilter(state)}
                        state={state}
                        dispatch={dispatch}
                    /> 
                </div>
                <div className="xl:w-4/5 lg:pl-10 w-full lg:w-3/4">
                    {isFetching ? (
                        <Loading />
                    ) : (
                        data?.results?.length > 0 ? (
                            <>
                                <div className="grid xl:grid-cols-5 sm:grid-cols-3 ssm:grid-cols-2 grid-cols-1 gap-6 " layout>
                                    {data.results.map((data, index) => (
                                        <motion.div key={data.id} initial={{opacity: 0}} animate={{ opacity: 1 }}>
                                            <Card data={data}/>
                                        </motion.div>
                                    ))}
                                </div>
                                <Pagination
                                    className="max-w-max mx-auto mt-5"
                                    count={data.total_pages > 500 ? 500 : data.total_pages}
                                    page={data.page}
                                    onChange={(_, page) => {
                                        dispatch({
                                            type: "addFilter",
                                            value: {
                                                "page": page
                                            }
                                        });
                                    }}
                                />
                            </>
                        ) : (
                            <h2 className="text-center font-bold text-2xl">No result!</h2>
                        )
                        
                    )}
                    
                </div>
            </div>
        </motion.div>
    )
}

export default Category