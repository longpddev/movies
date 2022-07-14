import React, { memo } from 'react'
import CardMovie from '../containers/card/CardMovie'
import CardTvShow from '../containers/card/CardTvShow'

const ListCard = memo(({ data }) => (
  <div className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 ssm:grid-cols-2 grid-cols-1 gap-4 ">
    {data?.results?.map((item, index) => (
      item.media_type === 'movie' ? (
        <CardMovie
          data={item}
          key={item.id}
        />
      ) : (
        <CardTvShow
          data={item}
          key={item.id}
        />
      )
    ))}
  </div>
))

export default ListCard