import React, { useRef } from "react"
import { styled } from "@mui/material/styles"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import ReactLoading from "react-loading"
import { NavLink } from "react-router-dom"

import StarIcon from "@mui/icons-material/Star"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { Image } from "../utilities"
import { useGetMoviesQuery } from "../../services/movieApi"
import ClickAwayListener from '@mui/material/ClickAwayListener';
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
  />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#032541",
    width: "100vh",
    maxWidth: "534px",
    border: "unset",
    padding: 0,
    fontSize: "1rem",
    display: "flex",
    height: "170px",
    "& .MuiTooltip-tooltip": {
      padding: 0,
    },
    "& .MuiTooltip-arrow": {
      color: "#032541",
    },
  },
}))

const MovieTooltip = ({ children, movieId, open, onClose, ...props }) => {
  const ref = useRef();
  const { data, isFetching } = useGetMoviesQuery(
    {
      id: movieId,
    },
    {
      skip: !open,
    }
  )
  return (
    <HtmlTooltip
      placement="top"
      arrow
      ref={ref}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      open={open}
      {...props}
      title={
        <ClickAwayListener onClickAway={() => onClose(false)}>
        <div className="w-full h-full flex">
          {isFetching ? (
            <div className=" h-full justify-center items-center">
              <ReactLoading type="bubbles" />
            </div>
          ) : (
            data ? <MovieTooltipContent data={data} /> : (
              <div className="w-full flex justify-center items-center text-2xl">
                <span>Cant load data</span>
              </div>
            )
          )}
        </div>
        </ClickAwayListener>
      }
    >
      {children}
    </HtmlTooltip>
  )
}

const MovieTooltipContent = ({ data }) => {
  return (
    <div className="p-3 w-full">
      <div className="flex w-full h-full">
        <div className=" w-1/5">
          <Image
            src={data?.poster_path}
            className="w-full h-full rounded-md"
            classImgNotFound="px-4 bg-sky-200"
          />
        </div>
        <div className="w-4/5 pl-4 flex flex-col">
          <div className="mb-2">
            <NavLink
              to={`/movie/${data.id}`}
              className="text-xl font-bold text-white hover:underline"
            >
              {data?.title}
            </NavLink>
            <span className="rounded-md ml-2 bg-sky-400 px-2 py-1 inline-flex items-center text-sm space-x-1">
              <StarIcon sx={{ fontSize: "16px" }} />
              <span className="leading-none mt-[0.15rem]">
                {data?.vote_average}
              </span>
            </span>
          </div>
          <p className="text-white text-sm limit-line-2">{data?.overview}</p>
          <div className="space-x-3 mt-auto">
            <button className="relative bg-sky-400 p-4 hover:bg-gray-400 rounded-lg text-white flex-inline w-[2.5rem] h-[2.5rem]">
              <BookmarkIcon
                fontSize="small"
                className="absolute-center"
              />
            </button>
            <button className="relative bg-sky-400 p-4 hover:bg-gray-400 rounded-lg text-white flex-inline w-[2.5rem] h-[2.5rem]">
              <FavoriteIcon
                fontSize="small"
                className="absolute-center"
              />
            </button>
            <button className="relative bg-sky-400 p-4 hover:bg-gray-400 rounded-lg text-white flex-inline w-[2.5rem] h-[2.5rem]">
              <StarIcon
                fontSize="small"
                className="absolute-center"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieTooltip
