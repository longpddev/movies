import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
const NavAccount = () => {
  const [active, setActive] = useState(false)
  const id = useRef()
  const elWrap = useRef()
  if(!id.current) {
    id.current = 'NavAccount-' + (Math.random() + 1).toString(32).slice(2, 7)
  }

  useEffect(() => {
    const handleClick = e => {
      const isInside = e.target.closest('#' + id.current)
      if(!isInside || e.target.nodeName === 'A') {
        setActive(false)
      }
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <div
      className="relative"
      id={id.current}
      ref={elWrap}
    >
        <div
          onClick={() => setActive(!active)}
          className="uppercase text-center w-8 h-8 select-none text-white leading-7 cursor-pointer bg-violet-800 rounded-full"
        >l</div>
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="bg-white border overflow-hidden border-gray-300 rounded-md absolute left-1/2 min-w-[178px] translate-x-[-50%] "
              style={{
                top: "calc(100% + 1rem)"
              }}
            >
              <ul>
                  <li className="px-5 py-4 border-b border-gray-300">
                      <strong>longpd</strong>
                      <p className="text-sm text-gray-400">View profile</p>
                  </li>
                  <div className='py-1 border-b border-gray-300'>
                      <Link
                        className='block px-5 py-1 text-md cursor-pointer hover:text-white hover:bg-sky-900 font-medium text-gray-700'
                        to='/'
                      >Discussion</Link>
                      <Link
                        className='block px-5 py-1 text-md cursor-pointer hover:text-white hover:bg-sky-900 font-medium text-gray-700'
                        to='/'
                      >Lists</Link>
                      <Link
                        className='block px-5 py-1 text-md cursor-pointer hover:text-white hover:bg-sky-900 font-medium text-gray-700'
                        to='/'
                      >Ratings</Link>
                      <Link
                        className='block px-5 py-1 text-md cursor-pointer hover:text-white hover:bg-sky-900 font-medium text-gray-700'
                        to='/'
                      >Watchlist</Link>
                  </div>
                  <div className="py-1 border-b border-gray-300">
                      <Link
                        className='block px-5 py-1 text-md cursor-pointer hover:text-white hover:bg-sky-900 font-medium text-gray-700'
                        to='/'
                      >Edit Profile</Link>
                      <Link
                        className='block px-5 py-1 text-md cursor-pointer hover:text-white hover:bg-sky-900 font-medium text-gray-700'
                        to='/'
                      >Settings</Link>
                  </div>
                  <div className="py-1">
                      <Link
                        className='block px-5 py-1 text-md cursor-pointer hover:text-white hover:bg-sky-900 font-medium text-gray-700'
                        to='/logout'
                      >Logout</Link>
                  </div>
              </ul>
          </motion.div>
          )}

        </AnimatePresence>

    </div>
  )
}

export default NavAccount