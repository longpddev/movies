import React from "react"
import Loading from "./Loading"
const Fetching = ({ isFetching = false, data, notFound, render }) => {
  return (
    <>
      {isFetching ? (
        <Loading />
      ) : data ? (
        render()
      ) : notFound ? (
        notFound
      ) : (
        <div className="text-2xl text-center font-semibold">Not Found...</div>
      )}
    </>
  )
}

export default Fetching
