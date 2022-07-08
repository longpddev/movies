import React, { createContext, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { useGetTvShowQuery } from "../../services/movieApi"
import menu from './configMenu'
import SeconMenu from "../../components/SeconMenu"
import { Image } from '../../containers/utilities'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const tvShowContext = createContext({});

const Layout = ({ children, main = false }) => {
    const { id: tvShowId } = useParams()
    const { data, isFetching } = useGetTvShowQuery(
      {
        id: tvShowId,
      },
      {
        skip: !tvShowId,
      }
    )

    useEffect(() => {
      if(!(data?.name)) return;
      document.title = data.name
    }, [data?.name])
    return (
        <tvShowContext.Provider value={{ tvShowId, data , isFetching}}>
            <SeconMenu menu={menu(tvShowId)} />
            {!main && data && (
                <div className="bg-sky-400 w-full p-4">
                    <div className="c-container flex">
                        <div className="max-w-[70px] w-full flex-none">
                            <Image
                              src={data.poster_path}
                              alt={data.name}
                              className="rounded-md"
                              ratio={150}
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-center pl-4">
                            <Link
                              to={`/tv/${tvShowId}`}
                              className="text-2xl font-bold text-white hover:text-white hover:underline"
                            >{data.name}</Link>
                            <Link
                              className="text-white hover:text-white hover:underline"
                              to={`/tv/${tvShowId}`}
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
        </tvShowContext.Provider>
    )
}

export default Layout