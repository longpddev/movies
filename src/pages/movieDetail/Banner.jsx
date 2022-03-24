import React from 'react'
import detailBanner from '../../images/detailBanner.jpg'
import movie from '../../images/movie1.jpg'
import Score from '../../components/Score'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined'
import { useGetMoviesQuery, getImage } from '../../services/movieApi'
import Fetching from '../../components/Fetching'
import moment from 'moment'

const Banner = ({ movieId }) => {
  const { data, isFetching } = useGetMoviesQuery(
    {
      id: movieId,
    },
    {
      skip: !movieId,
    }
  )

  console.log(data)
  return (
    <Fetching
      isFetching={isFetching}
      data={data}
      render={() => (
        <div
          className="detail-banner"
          style={{ backgroundImage: `url(${getImage(data.backdrop_path)})` }}
        >
          <div className="detail-banner__inner">
            <div className="c-container">
              <div className="flex flex-wrap py-8">
                <div className="sm:w-1/4 w-full">
                  <img
                    src={getImage(data.poster_path)}
                    alt=""
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="sm:w-3/4 sm:pl-8 w-full flex items-center">
                  <div>
                    <h1 className="text-3xl text-white">
                      <strong>{data.title}</strong> (
                      {moment(new Date(data.release_date)).format('YYYY')})
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
                        <Score score={data.vote_average * 10} size="xl" />
                      </div>
                      {Array(4)
                        .fill(1)
                        .map((item, index) => (
                          <div className="rounded-full p-6 bg-sky-900 relative pointer">
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
