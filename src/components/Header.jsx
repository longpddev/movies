import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { motion, AnimatePresence } from 'framer-motion';

import HeaderSearch from './HeaderSearch'
import logo from '../images/logo.svg';

const MenuList = [
  {
    label: "Movies",
    link: "/movie",
    children: [
      {
        label: "All",
        link: "/movide/full",
      },
      {
        label: "All",
        link: "/movide/full",
      },
      {
        label: "All",
        link: "/movide/full",
      },
      {
        label: "All",
        link: "/movide/full",
      },
    ]
  },
  {
    label: "Tv Shows",
    link: "/tv",
    children: [
      {
        label: "All",
        link: "/tv/full",
      },
      {
        label: "All",
        link: "/tv/full",
      },
      {
        label: "All",
        link: "/tv/full",
      },
      {
        label: "All",
        link: "/tv/full",
      },
    ]
  }
];

const Header = () => {
  const isMobile = useMediaQuery('(max-width:768.98px)');
  const [ isOpenMenu, setIsOpenMenu ] = useState(false);

  return (
    <header className="header pt-4 pb-4 flex bg-sky-900 sticky top-0 z-10">
      <div className="c-container m-auto flex align-center">

        {isMobile && (
          <div className="p-1 pl-0 mr-2 pointer" onClick={() => setIsOpenMenu(!isOpenMenu)}>
            {isOpenMenu?(
              <CloseIcon className="text-orange-500" />
            ):(
              <MenuOutlinedIcon className="text-sky-400" />
            )}
          </div>
        )}
        
        <AnimatePresence exitBeforeEnter initial={false}>
        {isMobile && isOpenMenu && (
          <motion.div 
            animate={{ left: 0 }} 
            initial={{ left: '-100%' }}
            exit={{ left: '-100%' }} 
            className="absolute z-50 top-full left-0 min-w-[300px]"
          >
            <ul className="flex flex-col menu-main bg-sky-700 py-5 px-4">
              {MenuList.map((item, index) => (
                <li className="pb-2" key={index}>
                  <NavLink className="text-white font-bold hover:underline" to={item.link}>{item.label}</NavLink>
                  {item.children.length > 0 && (
                    <ul className="flex flex-col pl-3">
                      {item.children.map((child, index) => (
                        <li className="pb-1" key={index}><NavLink className=" text-sm whitespace-nowrap text-white font-bold hover:underline" to={child.link}>{child.label}</NavLink></li>                      
                      ) )}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        </AnimatePresence>

        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="" className="w-40 mr-10 sm:w-60"/>
        </NavLink>

        {!isMobile && (
          <ul className="flex space-x-4 menu-main">
            {MenuList.map((item, index) => (
              <li className="items-center flex relative menu-l1" key={index}>
                <NavLink className="text-white font-bold hover:underline hover:underline-offset-2" to={item.link}>{item.label}</NavLink>
                {item.children.length > 0 && (
                  <ul className="submenu absolute top-full bg-white rounded-md shadow-sm p-2 min-w-[200px]">
                    {item.children.map((child, index) => (
                      <li className="" key={index}><NavLink className="w-full block text-sm whitespace-nowrap bg-gray-50 border-t border-b border-gray-100 hover:bg-gray-300 px-3 py-2 rounded-md" to={child.link}>{child.label}</NavLink></li>                      
                    ) )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}

        <HeaderSearch className="ml-auto pointer" isMobile={isMobile} />
      </div>
    </header>
  )
}

export default Header