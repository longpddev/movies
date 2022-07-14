import React, { useCallback, useEffect } from "react"
import { useLocation, useNavigate, NavLink } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search"
import { parse_query_string } from "../../helper"
import { useDebounce } from "use-debounce"
const InputSearch = ({ setSearch }) => {
  const { search } = useLocation()
  const navigate = useNavigate()
  const { p: query } = parse_query_string(search.replace(/^\?/, ""))
  const [debounceVal] = useDebounce(query || "", 300)
  const setQuery = useCallback((value) => {
    if (value.length === 0) return navigate("/search")
    navigate("/search?p=" + value)
  }, [])

  useEffect(() => {
    if (typeof setSearch === "function") setSearch(debounceVal)
  }, [debounceVal])
  return (
    <div className="border-b border-gray-300 py-2 flex items-center">
      <div className="c-container flex items-center">
        <SearchIcon className="mr-2" />
        <input
          type="text"
          className="border-0 outline-0 text-xl py-1 px-2 flex-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>
    </div>
  )
}

export default InputSearch
