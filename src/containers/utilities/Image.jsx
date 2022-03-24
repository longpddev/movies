import React from 'react'
import ImageDefault from '../../images/image-notfound.svg'
import { getImage } from '../../services/movieApi'
import clsx from 'clsx'

const Image = ({ src, size, classImgNotFound, className, ...props }) => {
  return src ? (
    <img src={getImage(src, size)} className={className} {...props} />
  ) : (
    <img
      src={ImageDefault}
      className={clsx(classImgNotFound, className, 'image-not-found')}
      {...props}
    />
  )
}

export default Image
