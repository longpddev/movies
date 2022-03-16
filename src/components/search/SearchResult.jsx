import React from 'react'
import clsx from 'clsx';
import Pagination from './Pagination';
const SearchResult = ({data, render, loadmore}) => {
  return (
    <div className="w-full md:w-3/4 pl-0 md:pl-8">
      {data.data?.map((item, index) => render(item, index))}

      {data.data.length > 0 && (
        <Pagination
          onClick={data.setPage}
          maxPage={data.maxPage}
          currentPage={data.currentPage}
        />
      )}
    </div>
  )
}

export default SearchResult