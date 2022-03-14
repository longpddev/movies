import React from 'react'

const SearchResult = ({data, render, loadmore}) => {
  return (
    <div className="w-full md:w-3/4 pl-0 md:pl-8">
      {data?.map((item, index) => render(item, index))}
      <button onClick={loadmore} className="w-full rounded-lg bg-sky-500 text-white text-lg font-weight">
        Load More
      </button>
    </div>
  )
}

export default SearchResult