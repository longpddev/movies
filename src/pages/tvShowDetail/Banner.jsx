import React from "react"
import Score from "../../components/Score"
import ListOutlinedIcon from "@mui/icons-material/ListOutlined"
import { useGetTvShowQuery, getImage } from "../../services/movieApi"
import Fetching from "../../components/Fetching"
import moment from "moment"
import Skeleton from '@mui/material/Skeleton';
import { Image } from '../../containers/utilities'
const Banner = ({ tvShowId }) => {
  const { data, isFetching } = useGetTvShowQuery(
    {
      id: tvShowId,
    },
    {
      skip: !tvShowId,
    }
  )

  return (
    <Fetching
      isFetching={isFetching}
      data={data}
      loading={ 
        <Skeleton
          variant="rectangular"
          animation='wave'
          height={350}
        /> 
      }
      render={() => (
        <div
          className="detail-banner"
          style={{ backgroundImage: `url(${getImage(data.backdrop_path)})` }}
        >
          <div className="detail-banner__inner">
            <div className="c-container">
              <div className="flex flex-wrap py-8">
                <div className="sm:w-1/4 w-full">
                  <Image
                    src={data.poster_path}
                    ratio={150}
                    alt=""
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="sm:w-3/4 sm:pl-8 w-full flex items-center">
                  <div>
                    <h1 className="text-3xl text-white">
                      <strong>{data.name}</strong> (
                      {moment(new Date(data.last_air_date)).format("YYYY")})
                    </h1>
                    <p className="text-white text-sm space-x-3">
                      <span className="block-inline text-sm text-gray-600 px-1 rounded-sm border border-gray-600">
                        16
                      </span>
                      {data.genres.map((item) => (
                        <span key={item.id}>{item.name}</span>
                      ))}
                      <span>
                        {data.runtime > 60
                          ? `${Math.floor(data.runtime / 60)}h${
                              data.runtime % 60
                            }m`
                          : `${data.runtime}m`}
                      </span>
                    </p>
                    <div className="my-5 flex flex-wrap items-center space-x-5">
                      <div>
                        <Score
                          score={data.vote_average * 10}
                          size="xl"
                        />
                      </div>
                      {Array(4)
                        .fill(1)
                        .map((item, index) => (
                          <div
                            className="rounded-full p-6 bg-sky-900 relative pointer"
                            key={index}
                          >
                            <ListOutlinedIcon className="absolute block top-1/2 left-1/2 translate--1/2 text-white" />
                          </div>
                        ))}
                    </div>
                    <p className="text-white text-xl pb-3 font-medium">
                      Overview
                    </p>
                    <p className="text-white mb-5">{data.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  )
}

export default Banner
