import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom';

import { useGetMoviesQuery } from '../../services/movieApi';
import Fetching from '../../components/Fetching';
import { Image } from '../../containers/utilities';
import Flickity from 'react-flickity-component';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from '@mui/icons-material/Star';

const flickityOptions = {
  initialIndex: 0,
  pageDots: false,
  prevNextButtons: false,
  freeScroll: false,
  contain: true,
  cellAlign: 'left'
}
const Recommendations = ({ movieId }) => {
  const { data, isFetching } = useGetMoviesQuery({
    id: movieId,
    type: "recommendations"
  }, {
    skip: !movieId
  })

  const EmptyData = <div className="min-h-[50px] flex items-center">
    <h2 className="font-semibold text-xl text-gray-500">Empty...</h2>
  </div>
  return (
    <>
      <h3 className="text-xl mb-3 py-1 font-bold">Recommendations</h3>
      <Fetching
        data={data?.results?.length > 0}
        isFetching={isFetching}
        notFound={EmptyData}
        render={() => (
          <Flickity options={flickityOptions}>
            {data.results.map(item => (
              <div
                className="pr-3 max-w-[350px]"
                key={item.id}
              >
                <div className="relative overflow-hidden rounded-md">
                  <Image
                    src={item.backdrop_path}
                    size={300}
                    className="object-cover object-top w-full"
                  />
                  <div className="absolute-center w-full h-full transition opacity-0 hover:opacity-100 flex flex-col">
                    <div className="flex bg-gray-100 opacity-90 py-3 px-2 mt-auto space-x-2">
                      <span className="mr-auto text-sm flex items-center space-x-1 pointer">
                        <CalendarMonthIcon sx={{ fontSize: "18px" }} />
                        <span>{moment(new Date(item.release_date)).format("YYYY-MM-DD")}</span>
                      </span>
                      <span className=" pointer">
                        <FavoriteIcon sx={{ fontSize: "18px" }} />
                      </span>
                      <span className=" pointer">
                        <BookmarkIcon sx={{ fontSize: "18px" }} />
                      </span>
                      <span className=" pointer">
                        <StarIcon sx={{ fontSize: "18px" }} />
                      </span>
                    </div>
                  </div>
                </div>
                <p className="flex justify-between mt-2 max-w-full">
                  <Link
                    to={`/movie/${item.id}`}
                    className="pr-1"
                  >{item.title}</Link>
                  <span>{Math.round(item.vote_average * 10)}%</span>
                </p>
              </div>
            ))}
          </Flickity>
        )}
      />
    </>
  )
}

export default Recommendations