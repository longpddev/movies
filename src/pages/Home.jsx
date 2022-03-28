import React from "react"
import Score from "../components/Score"

import Banner from "../components/Banner"
import Popular from "../components/Popular"
import Trending from "../components/Trending"

const Home = () => {
  return (
    <div>
      <Banner className="mb-8" />
      <Popular className="mb-8"/>
      <Trending className="mb-8" />
    </div>
  )
}

export default Home
