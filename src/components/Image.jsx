import React,{ useState } from 'react'
import ImageError from '../images/image-notfound.svg'
import ImageLoading from '../images/loading.gif'
import clsx from 'clsx'

const Image = ({src, className, ratio, ...props}) => {
  // -1 error, 0 loading, 1 load success
  let url;
  const [ loadStatus, setLoadStatus] = useState(0);

  switch(loadStatus) {
    case -1:
      url = ImageError;
      break;
    case 0:
      url = ImageLoading;
      break;
    case 1:
      url = src;
      break;
    default:
      console.error("sometime component error");
      break;
  }

  return (
    <>
      {ratio ? (
        <div
          className={clsx("w-full relative")}
          style={{paddingTop: `${ratio}%`}}
        >
          <img
            className={clsx(
              "absolute inset-0 w-full h-full", 
              className, {
              'empty-image': src !== url
            })}
            src={url}
            {...props}
          />
        </div>
      ) : (
        <img
          className={clsx(className, {
            'empty-image': src !== url
          })}
          src={url}
          {...props}
        />
      )}
      
      <img
        src={src}
        className="img-hidden"
        onError={(e) => {
          setLoadStatus(-1)
        }}
        onLoad={(e) => {
          setLoadStatus(1)
        }}
        alt="hidden image"
      />
    </>
  )
}

export default Image