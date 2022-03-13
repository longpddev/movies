import React, { useEffect, useState, useCallback, memo } from 'react'
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import SearchIcon from '@mui/icons-material/Search';
import { parse_query_string } from '../helper'; 
import { useGetSearchQuery, getImage } from '../services/movieApi'; 
import moment from 'moment';
import CardFull from '../components/CardFull';
import clsx from 'clsx';

const SearchResult = memo(({ movies, company, keyword, person, tv }) => {
    const [ activeTab, setActiveTab ] = useState(0); 
    const siteBars = [
        {
            name: "Movies",
            value: movies?.total_results || 0,
            data: movies,
            component: function() {
                if(!(this.data?.results?.length)) return (
                    <div className="text-center text-2xl">No result!!</div>
                );

                return this.data?.results?.map((item, index) => (
                    <CardFull className="mb-4" data={item} key={item.id} />
                ))
            }
        },
        {
            name: "TV Shows",
            value: 0,
            data: tv,
            component: function() {
                if(!(this.data?.results?.length)) return (
                    <div className="text-center text-2xl">No result!!</div>
                );

                return this.data?.results?.map((item, index) => (
                    <div className="card-list mb-4" key={item.id}>
                        <NavLink to="/" className="flex">
                            <img src={getImage(item.poster_path, 'sm')} alt="" className="max-h-[145px]" />
                            <div className="p-3 flex justify-center flex-col">
                                <p className="text-xl font-weight mb-1">{item.name}</p>
                                <p className="text-sm text-gray-400">{moment(new Date(item.first_air_date)).format("MMMM DD, YYYY")}</p>
                            </div>
                        </NavLink>
                    </div>
                ))
            }
        },
        {
            name: "People",
            value: 0,
            data: person,
            component: function() {
                if(!(this.data?.results?.length)) return (
                    <div className="text-center text-2xl">No result!!</div>
                );

                return this.data?.results?.map((item, index) => (
                    <div className="mb-3 flex" key={item.id}>
                        {item.profile_path ? (
                            <img src={getImage(item.profile_path, 'sm')} alt="" className="h-[100px] w-[100px] rounded-md" />
                        ) : (
                            <div className="h-[100px] w-[100px] rounded-md bg-gray-400"></div>
                        )}

                        <div className="flex justify-center flex-col py-2 px-4">
                            <p className="text-xl">{item.name}</p>
                            <p className="text-sm text-gray-400">{item.popularity}</p>
                        </div>
                    </div>
                ))
            }
        },
        {
            name: "Companies",
            value: 0,
            data: company,
            component: function() {
                if(!(this.data?.results?.length)) return (
                    <div className="text-center text-2xl">No result!!</div>
                );

                return this.data?.results?.map((item, index) => (
                    <div className="border-t border-gray-300 py-2 flex space-x-2" key={item.id}>
                        {item.logo_path ? (
                            <img src={getImage(item.logo_path, 'sm')} alt="" className="max-h-[80px] block " />
                        ) : (
                            <span className="text-xl">{item.name}</span>
                        )}
                    </div>
                ))
            }
        },
        {
            name: "Keywords",
            value: 0,
            data: keyword,
            component: function() {
                if(!(this.data?.results?.length)) return (
                    <div className="text-center text-2xl">No result!!</div>
                );
                
                return this.data?.results?.map((item, index) => (
                    <div className="border-t border-gray-300 py-2 flex space-x-2" key={item.id}>
                        <span className="text-xl">{item.name}</span>
                    </div>
                ))
            }
        }
    ]
    return (
        <div className="c-container my-8 flex flex-wrap">
            <div className="w-full mb-4 md:mb-0 md:w-1/4">
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <div className="py-3 px-4 bg-sky-400 text-white text-xl font-weight">
                        <span>Search Results</span>
                    </div>
                    <ul className="pt-2">
                        {siteBars.map((item, index) => (
                            <li 
                            className={clsx('py-2 px-4 hover:bg-gray-300 hover:font-weight pointer flex justify-between',{
                                'bg-gray-300': index === activeTab
                            })}
                            onClick={() => setActiveTab(index)}
                            >
                                <span>{item.name}</span>
                                <span className="rounded-lg px-2 bg-gray-200 pt-px text-sm text-gray-700">{item?.data?.total_results || 0}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-full md:w-3/4 pl-0 md:pl-8">
                {siteBars[activeTab].component()}
            </div>
        </div>
    )
});

const Search = () => {
    const { search } = useLocation();
    const { p: query } = parse_query_string(search.replace(/^\?/, '')); 

    const navigate = useNavigate();
    const [ debounceVal ] = useDebounce(query || "", 300);
    const { data: moviesData } = useGetSearchQuery({
        type: 'movie',
        keyword: debounceVal
    }, { 
        skip: (debounceVal?.length || 0) < 2
    });

    const { data: companyData } = useGetSearchQuery({
        type: 'company',
        keyword: debounceVal
    }, { 
        skip: (debounceVal?.length || 0) < 2
    });

    const { data: keywordData } = useGetSearchQuery({
        type: 'keyword',
        keyword: debounceVal
    }, { 
        skip: (debounceVal?.length || 0) < 2
    });

    const { data: personData } = useGetSearchQuery({
        type: 'person',
        keyword: debounceVal
    }, { 
        skip: (debounceVal?.length || 0) < 2
    });

    const { data: tvData } = useGetSearchQuery({
        type: 'tv',
        keyword: debounceVal
    }, { 
        skip: (debounceVal?.length || 0) < 2
    });
    console.log(debounceVal)
    const setQuery = useCallback((value) => {
        if(value.length === 0) return navigate('/search');
        navigate('/search?p=' + value);
    }, [])

  return (
    <>
        <div className="border-b border-gray-300 py-2 flex items-center">
           <div className="c-container">
            <SearchIcon className="mr-2 mb-1" />
            <input 
                type="text" 
                className="border-0 outline-0 text-xl py-1 px-2 " 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..." 
            />
           </div>
        </div>
        <SearchResult 
            movies={moviesData}
            company={companyData}
            keyword={keywordData}
            person={personData}
            tv={tvData} 
        />
    </>
  )
}

export default Search