import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import { InputSearch, useMultiSearch, TabBar, SearchResult } from '../containers/search';
import CardFull from '../components/CardFull';
import { getImage } from '../services/movieApi'; 
const SearchControl = ({ 
    movies, 
    company, 
    keyword, 
    person, 
    tv
}) => {
    const [ activeTab, setActiveTab ] = useState(1);
    const tabs = [
        {
            name: "Movies",
            total_results: movies.data?.total_results || 0,
            data: movies.data?.results || [],
            currentPage: movies.page,
            maxPage: movies.data?.total_pages || 0,
            setPage: movies.setPage,
            component: (item, index) => ( <CardFull className="mb-4" data={item} key={item.id} /> )
        },
        {
            name: "Tv Shows",
            total_results: tv.data?.total_results || 0,
            data: tv.data?.results || [],
            currentPage: tv.page,
            maxPage: tv.data?.total_pages || 0,
            setPage: tv.setPage,
            component: (item, index) => ( <div className="card-list mb-4" key={item.id}>
                <NavLink to="/" className="flex">
                    <img src={getImage(item.poster_path, 'sm')} alt="" className="max-h-[145px] object-cover" />
                    <div className="p-3 flex justify-center flex-col">
                        <p className="text-xl font-weight mb-1">{item.name}</p>
                        <p className="text-sm text-gray-400">{moment(new Date(item.first_air_date)).format("MMMM DD, YYYY")}</p>
                    </div>
                </NavLink>
            </div> )
        },
        {
            name: "People",
            total_results: person.data?.total_results || 0,
            data: person.data?.results || [],
            currentPage: person.page,
            maxPage: person.data?.total_pages || 0,
            setPage: person.setPage,
            component: (item, index) => ( <div className="mb-3 flex" key={item.id}>
                {item.profile_path ? (
                    <img src={getImage(item.profile_path, 'sm')} alt="" className="h-[100px] w-[100px] rounded-md  object-cover" />
                ) : (
                    <div className="h-[100px] w-[100px] rounded-md bg-gray-400"></div>
                )}

                <div className="flex justify-center flex-col py-2 px-4">
                    <p className="text-xl">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.popularity}</p>
                </div>
            </div> )
        },
        {
            name: "Companies",
            total_results: company.data?.total_results || 0,
            data: company.data?.results || [],
            currentPage: company.page,
            maxPage: company.data?.total_pages || 0,
            setPage: company.setPage,
            component: (item, index) => ( <div className="border-t border-gray-300 py-2 flex space-x-2" key={item.id}>
                {item.logo_path ? (
                    <img src={getImage(item.logo_path, 'sm')} alt="" className="max-h-[80px] block  object-cover" />
                ) : (
                    <span className="text-xl">{item.name}</span>
                )}
            </div>)
        },
        {
            name: "Keywords",
            total_results: keyword.data?.total_results || 0,
            data: keyword.data?.results || [],
            currentPage: keyword.page,
            maxPage: keyword.data?.total_pages || 0,
            setPage: keyword.setPage,
            component: (item, index) => ( <div className="border-t border-gray-300 py-2 flex space-x-2" key={item.id}>
                <span className="text-xl">{item.name}</span>
            </div> )
        }
    ];

    const tabDataActive = tabs[activeTab];

    return (<div className="c-container my-8 flex flex-wrap">
        <TabBar
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
        <SearchResult 
            data={tabDataActive}
            loadmore={tabDataActive.setPage}
            render={tabDataActive.component} 
        />
    </div>);
}

const Search1 = () => {
    const [ search, setSearch ] = useState('');
    const { 
        movies,
        company, 
        keyword, 
        person, 
        tv
    } = useMultiSearch(search);

    return (
        <>
            <InputSearch setSearch={setSearch} />
            <SearchControl
                movies={movies}
                company={company}
                keyword={keyword}
                person={person}
                tv={tv}
            />
        </>
    )
}

export default Search1