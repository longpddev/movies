import React, { useEffect, useState } from "react"
import AutocompleteOrigin from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { styled } from "@mui/material/styles"
import { useGetSearchQuery } from "../../services/movieApi"
import { useDebounce } from "use-debounce"
const Autocomplete = styled(AutocompleteOrigin)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& .MuiAutocomplete-input": {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
}))

const InputKeyword = ({ onChange }) => {
  const [value, setValue] = useState("")
  const [debounceVal] = useDebounce(value, 300)
  const { data } = useGetSearchQuery(
    {
      type: "keyword",
      keyword: debounceVal,
    },
    {
      skip: debounceVal.length === 0,
    }
  )

  return (
    <Autocomplete
      multiple
      options={data?.results || []}
      getOptionLabel={(option) => option.name}
      onChange={(_, value) => {
        if (typeof onChange === "function") onChange(value)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Keyword"
        />
      )}
    />
  )
}

export default InputKeyword
