import React from "react"
import Pagination from "@mui/material/Pagination"

const SearchResult = ({ data, render, loadmore }) => {
  return (
    <div className="w-full md:w-3/4 pl-0 md:pl-8">
      {data.data?.map((item, index) => render(item, index))}

      {data.data.length > 0 && (
        <Pagination
          className="mx-auto max-w-max"
          count={data.maxPage}
          page={data.currentPage}
          onChange={(_, value) => data.setPage(value)}
        />
      )}
    </div>
  )
}

export default SearchResult
