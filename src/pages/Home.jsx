import React from 'react'
import Score from '../components/Score';

import Banner from '../components/Banner';
import Popular from '../components/Popular';
import Trending from '../components/Trending';
import LeaderBoard from '../components/LeaderBoard';


const Home = () => {

  return (
    <div>
      <Banner className="mb-8" />
      {/* <Popular className="mb-8" id="list-2" /> */}
      <Trending className="mb-8" />
      <LeaderBoard />
    </div>
  )
}

export default Home