import React from "react"

import Score from "../components/Score"
import Image from '../components/Image'
const StyleGuide = () => {
  return (
    <>
      <Score
        score={100}
        size="lg"
      />
      <Score score={90} />
      <Score
        score={80}
        size="xl"
      />
      <Score score={70} />
      <Score score={60} />
      <Score
        score={50}
        size="md"
      />
      <Score score={40} />
      <Score score={30} />
      <Score score={20} />
      <Score score={0} />
      <Image
        width="626"
        height="252"
        src={"https://img.freepik.com/free-psd/digital-marketing-facebook-banner-template_237398-233.jpg"}
      />
    </>
  )
}

export default StyleGuide
