import React from "react"
import { getImage } from "../../services/movieApi"
import ImageConponent from '../../components/Image'

const Image = ({ src, size, classImgNotFound, className, ratio, ...props }) => {
  return (
    <ImageConponent
      ratio={ratio}
      src={getImage(src, size)}
      className={className}
      {...props}
    />
  )
}

export default Image
