import React, { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search"
import { Icon } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import clsx from "clsx"
import { useDebounce } from "use-debounce"
import { motion, AnimatePresence } from "framer-motion"
import { useGetSearchQuery } from "../services/movieApi"
const HeaderSearch = ({ isMobile, className }) => {
  const [text, setText] = useState("")
  const [debounceVal] = useDebounce(text, 300)
  const [isActive, setIsActive] = useState(false)
  const { data: searchResult, isFetching } = useGetSearchQuery(
    {
      type: "keyword",
      keyword: debounceVal,
    },
    {
      skip: debounceVal.length < 2,
    }
  )
  const navigate = useNavigate()
  const redirectSearchPage = useCallback((p) => {
    navigate(`/search?p=${p}`)
    setIsActive(false)
  })
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    redirectSearchPage(text)
  })

  return (
    <div className={clsx("more", className)}>
      <ul className="z-20 relative">
        <li onClick={() => setIsActive(!isActive)}>
          {isActive ? (
            <CloseIcon
              className="text-orange-500"
              sx={{ fontSize: isMobile ? 25 : 30 }}
            />
          ) : (
            <SearchIcon
              className="text-sky-400"
              sx={{ fontSize: isMobile ? 25 : 30 }}
            />
          )}
        </li>
      </ul>
      <AnimatePresence
        exitBeforeEnter
        initial={false}
      >
        {isActive && (
          <motion.div
            animate={{ top: "100%", opacity: 1 }}
            exit={{ top: 0, opacity: 0 }}
            initial={{ top: 0, opacity: 0 }}
            className="search-contain absolute inset-0 top-full z-10 bg-white p-5  min-h-max border-b border-gray-300"
          >
            <div className="c-container">
              <form
                action=""
                onSubmit={handleSubmit}
              >
                <input
                  className="rounded-full p-2 pl-5 shadow-md border-0 outline-0 w-full"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Search for a movie, Tv shows..."
                />
              </form>
              <motion.div layout>
                {isFetching ? (
                  <p>Loading...</p>
                ) : (
                  <div className="result">
                    {searchResult?.results?.length > 0 ? (
                      <ul>
                        {searchResult.results.map((item) => (
                          <li
                            onClick={() => redirectSearchPage(item.name)}
                            key={item.id}
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="no-result w-full grid place-content-center min-h-[100px]">
                        <span className="font-bold text-3xl text-gray-500">
                          No result
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeaderSearch
