import React, { createContext, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { useGetMoviesQuery } from "../../services/movieApi"
import menu from './configMenu'
import SeconMenu from "../../components/SeconMenu"
import { Image } from '../../containers/utilities'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const movieContext = createContext({});

const Layout = ({ children, main = false }) => {
    const { id: movieId } = useParams()
    const { data, isFetching } = useGetMoviesQuery(
      {
        id: movieId,
      },
      {
        skip: !movieId,
      }
    )

    useEffect(() => {
      if(!(data?.title)) return;
      document.title = data.title
    }, [data?.title])
    return (
        <movieContext.Provider value={{ movieId, data , isFetching}}>
            <SeconMenu menu={menu(movieId)} />
            {!main && data && (
                <div className="bg-sky-400 w-full p-4">
                    <div className="c-container flex">
                        <div className="max-w-[70px] w-full flex-none">
                            <Image
                              src={data.poster_path}
                              alt={data.title}
                              className="rounded-md"
                              ratio={150}
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-center pl-4">
                            <Link
                              to={`/movie/${movieId}`}
                              className="text-2xl font-bold text-white hover:text-white hover:underline"
                            >{data.title}</Link>
                            <Link
                              className="text-white hover:text-white hover:underline"
                              to={`/movie/${movieId}`}
                            > <ArrowBackIcon sx={{fontSize: "17px"}}/> Back to main</Link>
                        </div>
                    </div>
                </div>
            )}

            {!main ? (
                <div className="py-8">
                    {children}
                </div>
            ) : (
                children
            )}
        </movieContext.Provider>
    )
}

export default Layout