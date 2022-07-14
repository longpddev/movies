import React from "react"
import Loading from "./Loading"
const Fetching = ({ isFetching = false, data, loading, notFound, render }) => {
  return (
    <>
      {isFetching ? (
        loading || <Loading />
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
