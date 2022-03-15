import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import clsx from 'clsx';
const SearchResult = ({data, render, loadmore}) => {

  let maxItemPaginate = Math.min(data.maxPage, 2);
  let prevPage = data.currentPage - 1 <= 0 ? 1 : data.currentPage - 1;
  let nextPage = data.currentPage + 1 > data.maxPage ? data.maxPage : data.currentPage + 1;
  return (
    <div className="w-full md:w-3/4 pl-0 md:pl-8">
      {data.data?.map((item, index) => render(item, index))}

      <ul className="max-w-max mx-auto flex space-x-2 items-center">
        <li onClick={() => {loadmore(prevPage)}} className="pointer hover:bg-gray-300"> <ArrowBackIosNewIcon /> </li>
        <li  onClick={() => {loadmore(1)}} className={clsx("text-xl rounded-md p-2 pointer hover:bg-gray-300",{
          "bg-gray-300": 1 === data.currentPage
        })}>1</li>

        {prevPage != 1 && (
          <li onClick={() => {loadmore(prevPage)}} className={clsx("text-xl rounded-md p-2 pointer hover:bg-gray-300",{
            "bg-gray-300": prevPage === data.currentPage
          })} >
            {prevPage}
          </li>
        )}

        {data.currentPage != 1 && data.currentPage != data.maxPage  && (
          <li onClick={() => {loadmore(data.currentPage)}} className={clsx("text-xl rounded-md p-2 pointer hover:bg-gray-300",{
            "bg-gray-300": data.currentPage === data.currentPage
          })} >
            {data.currentPage}
          </li>
        )}
        

        {nextPage != data.maxPage && (
          <li onClick={() => {loadmore(nextPage)}} className={clsx("text-xl rounded-md p-2 pointer hover:bg-gray-300",{
            "bg-gray-300": nextPage === data.currentPage
          })} >
            {nextPage}
          </li>
        )}

        {maxItemPaginate < data.maxPage && (
          <li>...</li>
        )}

        <li  onClick={() => {loadmore(data.maxPage)}} className={clsx("text-xl rounded-md p-2 pointer hover:bg-gray-300",{
            "bg-gray-300": data.maxPage === data.currentPage
          })}>{data.maxPage}</li>
        <li onClick={() => {loadmore(nextPage)}} className="pointer hover:bg-gray-300"> <ArrowForwardIosIcon /> </li>
      </ul>
    </div>
  )
}

export default SearchResult