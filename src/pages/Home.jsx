import React from 'react'
import { motion } from 'framer-motion';
import Score from '../components/Score';

import Banner from '../components/Banner';
import List from '../components/List';
import LeaderBoard from '../components/LeaderBoard';

const Home = () => {
  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <Banner className="mb-8" />
      <List className="mb-8" id="list-1" />
      <List className="mb-8" id="list-2" />
      <LeaderBoard />
    </motion.div>
  )
}

export default Home