import { fn } from "moment"
import React, { useEffect } from "react"

import Banner from "../components/Banner"
import Popular from "../components/Popular"
import Trending from "../components/Trending"

const Home = () => {
  document.title = 'Home page'

  return (
    <div>
      <Banner className="mb-8" />
      <Popular className="mb-8"/>
      <Trending className="mb-8" />
    </div>
  )
}

export default Home
