import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import Layout, { movieContext } from './Layout'
import { useGetMoviesQuery } from '../../services/movieApi'
import { Image } from '../../containers/utilities'
const CastPage = () => {
    const { movieId, data: movieData, isFetching: isFetchingMovie } = useContext(movieContext)
    const { data: credits, isFetching: isFetchingCredits } = useGetMoviesQuery({
        id: movieId,
        type: "credits"
    }, {
        skip: !movieId
    })

    const groupCrew = useMemo(() => {
        if(!(credits?.crew?.length > 0)) return [];

        const group = credits.crew.reduce((reduce, item) => {
            if(!(item.known_for_department in reduce)) {
                reduce[item.known_for_department] = [];
            }

            reduce[item.known_for_department].push(item);
            return reduce;
        }, {})

        return group;
    }, [credits])

    return (
        <div className="c-container">
            <div className="mx-[-8px] flex flex-wrap">
                <div className="md:w-1/2 mb-4 w-full px-2">
                    <p className="font-bold text-xl mb-6">Cast <span className="text-gray-400 font-normal">{credits?.cast?.length || 0}</span></p>
                    {credits?.cast.map(item => (
                        <CardSimple
                          data={item}
                          className="mb-2"
                        />
                    ))}
                </div>
                <div className="md:w-1/2 mb-4 w-full px-2">
                    <p className="font-bold text-xl mb-6">Crew <span className="text-gray-400 font-normal">{credits?.crew?.length || 0}</span></p>
                    {Object.keys(groupCrew).map(key => (
                        <div
                          key={key}
                          className="mb-6"
                        >
                            <p className="font-semibold mb-2">{key}</p>
                            {groupCrew[key].map(item => (
                                <CardSimple
                                  data={item}
                                  className="mb-2"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const CardSimple = ({ data, className}) => (
    <div className={clsx("flex", className)}>
        <div className="flex-none w-[70px]">
            <Image 
              src={data.profile_path}
              size={200}
              className="object-cover object-top rounded-md"
              ratio={130}
            />
        </div>
        <div className="pl-4 flex-1 flex flex-col justify-center">
            <Link
              to={`/person/${data.id}`}
              className="font-bold"
            >{data.name}</Link>
            <p className="text-sm text-gray-700">{data.character}</p>
        </div>
    </div>
)

export default () => (
    <Layout>
        <CastPage />
    </Layout>
)