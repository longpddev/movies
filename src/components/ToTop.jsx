import React, { useEffect, useState } from 'react'
import Body from "./Body"
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const scrollToTop = () => {
    window.scrollTo(0, 0);
}

const ToTop = () => {
    const [ isShow, setIsShow ] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if(window.pageYOffset > 1000) {
                setIsShow(true)
            } else {
                setIsShow(false)
            }
        }
        handleScroll();
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    }, [])
  return (
      <Body>
          {isShow && (
            <div className="pointer p-1 rounded-full bg-sky-400 fixed bottom-3 right-3 hover:bottom-6 duration-300 transition-all">
                <ArrowCircleUpIcon
                  onClick={() => scrollToTop()}
                  className="relative "
                  sx={{
                        color: "white",
                        fontSize: "50px"
                    }}
                />
            </div>
          )}
      </Body>
  )
}

export default ToTop