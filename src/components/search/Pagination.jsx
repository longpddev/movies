import React from 'react'
import clsx from 'clsx';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Pagination = ({onClick, maxPage, currentPage}) => {
    let maxItemPaginate = Math.min(maxPage, 2);
    let prevPage = currentPage - 1 <= 0 ? 1 : currentPage - 1;
    let nextPage = currentPage + 1 > maxPage ? maxPage : currentPage + 1;
    return (
        <ul className="max-w-max mx-auto flex space-x-2 items-center">
            <li onClick={() => {onClick(prevPage)}} className="pointer hover:bg-gray-300"> <ArrowBackIosNewIcon /> </li>
            <li  onClick={() => {onClick(1)}} className={clsx("text-xl rounded-md p-2 pointer hover:bg-gray-300",{
            "bg-gray-300": 1 === currentPage
            })}>1</li>

            {prevPage != 1 && (
            <li onClick={() => {onClick(prevPage)}} className={clsx("text-xl rounded-md p-2 pointer hover:bg-gray-300",{
                "bg-gray-300": prevPage === currentPage
            })} >
                {prevPage}
            </li>
            )}

            {currentPage != 1 && currentPage != maxPage  && (
            <li onClick={() => {onClick(currentPage)}} className={clsx("text-xl rounded-md p-2 pointer hover:bg-gray-300",{
                "bg-gray-300": currentPage === currentPage
            })} >
                {currentPage}
            </li>
            )}
            

            {nextPage != maxPage && (
            <li onClick={() => {onClick(nextPage)}} className={clsx("text-xl rounded-md p-2 pointer hover:bg-gray-300",{
                "bg-gray-300": nextPage === currentPage
            })} >
                {nextPage}
            </li>
            )}

            {maxItemPaginate < maxPage && (
            <li>...</li>
            )}

            <li  onClick={() => {onClick(maxPage)}} className={clsx("text-xl rounded-md p-2 pointer hover:bg-gray-300",{
                "bg-gray-300": maxPage === currentPage
            })}>{maxPage}</li>
            <li onClick={() => {onClick(nextPage)}} className="pointer hover:bg-gray-300"> <ArrowForwardIosIcon /> </li>
        </ul>
    )
}

export default Pagination