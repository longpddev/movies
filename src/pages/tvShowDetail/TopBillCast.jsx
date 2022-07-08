import React, { useMemo } from "react"
import Flickity from "react-flickity-component"
import "flickity/css/flickity.css"
import CardActor from "../../containers/card/CardActor"
import { useGetTvShowQuery } from "../../services/movieApi"
import Fetching from "../../components/Fetching"

const flickityOptions = {
  initialIndex: 0,
  pageDots: false,
  prevNextButtons: false,
  freeScroll: true,
  contain: true,
  cellAlign: "left"
}

const TopBillCast = ({ tvShowId }) => {
  const { data, isFetching } = useGetTvShowQuery(
    {
      id: tvShowId,
      type: "credits",
    },
    {
      skip: !tvShowId,
    }
  )

  const getTop = useMemo(() => {
    if (!(data?.cast?.length > 0)) return []
    let result = data.cast.filter((item) => item.profile_path)
    result.sort((a, b) => b.popularity - a.popularity)
    result = result.slice(0, 20)

    return result
  }, [data])

  return (
    <>
      <h3 className="text-xl mb-6 font-bold">Series Cast</h3>
      <Fetching
        isFetching={isFetching}
        data={getTop}
        render={() => (
          <Flickity options={flickityOptions}>
            {getTop.map((item, index) => (
              <div
                className="pr-4"
                key={index}
              >
                <CardActor
                  data={item}
                  key={index}
                  className="w-[175px] w-full"
                />
              </div>
            ))}
          </Flickity>
        )}
      />
    </>
  )
}

export default TopBillCast
