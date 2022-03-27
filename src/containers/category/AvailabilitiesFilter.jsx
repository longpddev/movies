import React, { useState, useEffect, useReducer } from "react"
import Checkbox from "@mui/material/Checkbox"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabelOrigin from "@mui/material/FormControlLabel"
import { styled } from "@mui/material/styles"
import { motion, AnimatePresence } from "framer-motion"

const FormControlLabel = styled(FormControlLabelOrigin)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontSize: "14px",
  },
}))

function reducer(state, action) {
  switch (action.type) {
    case "change":
      return {
        ...state,
        ...action.payload,
      }
    default:
      throw new Error(`Invalid action ${action.type}`)
  }
}

const initialState = {
  flatrate: {
    label: "Flat rate",
    isChecked: false,
  },
  free: {
    label: "Free",
    isChecked: false,
  },
  ads: {
    label: "Ads",
    isChecked: false,
  },
  rent: {
    label: "Rent",
    isChecked: false,
  },
  buy: {
    label: "Buy",
    isChecked: false,
  },
}

const AvailabilitiesFilter = ({ action, dispatch }) => {
  const [isSearchAll, setIsSearchAll] = useState(true)
  const [options, dispatchOption] = useReducer(reducer, initialState)
  useEffect(() => {
    let optionsValue = Object.keys(options).filter(
      (key) => options[key].isChecked
    )
    let toString = optionsValue.toString(",")

    if (toString.length > 0) {
      dispatch({
        type: "addFilter",
        value: {
          with_watch_monetization_types: optionsValue.join(", "),
        },
      })
    } else {
      dispatch({
        type: "removeFilter",
        value: {
          with_watch_monetization_types: true,
        },
      })
    }
  }, [options])

  useEffect(() => {
    if (!isSearchAll) return

    Object.keys(options).map((key) => {
      options[key].isChecked = false
    })

    dispatch({
      type: "removeFilter",
      value: {
        with_watch_monetization_types: true,
      },
    })
  }, [isSearchAll])

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSearchAll}
              onClick={(e) => setIsSearchAll(e.target.checked)}
            />
          }
          label="Search all availabilities?"
        />
        <motion.div layout className="pl-2">
          <AnimatePresence>
            {!isSearchAll &&
              Object.keys(options).map((key, index) => (
                <motion.div
                  key={key}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={options[key].isChecked}
                        onClick={() => {
                          options[key].isChecked = !options[key].isChecked
                          dispatchOption({
                            type: "change",
                            payload: {
                              [key]: options[key],
                            },
                          })
                        }}
                      />
                    }
                    label={options[key].label}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </FormGroup>
    </>
  )
}

export default AvailabilitiesFilter
