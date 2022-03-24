import React from 'react'

import Score from '../components/Score'

const StyleGuide = () => {
  return (
    <>
      <Score score={100} size="lg" />
      <Score score={90} />
      <Score score={80} size="xl" />
      <Score score={70} />
      <Score score={60} />
      <Score score={50} size="md" />
      <Score score={40} />
      <Score score={30} />
      <Score score={20} />
      <Score score={0} />
    </>
  )
}

export default StyleGuide
