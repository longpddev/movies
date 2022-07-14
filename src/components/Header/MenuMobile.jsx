import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import When from '../When'
import CloseIcon from "@mui/icons-material/Close"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { motion, AnimatePresence } from "framer-motion"
import { menuList } from '../../settings/menuList'

const MenuMobile = ({
  isMobile
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const MainLink = ({item}) => {
    if (item.link.length > 0) return (
      <NavLink
        className="text-white font-bold hover:underline"
        to={item.link}
      >
        {item.label}
      </NavLink>
    )

    return (
      <p className="text-white font-bold hover:underline">
        {item.label}
      </p>
    )
  }

  const ChildrenLink = ({item}) => {
    if(item.children.length === 0) return null
    return (
      <ul className="flex flex-col pl-3">
        {item.children.map((child, index) => (
          <li
            className="pb-1"
            key={index}
          >
            <NavLink
              className=" text-sm whitespace-nowrap text-white font-bold hover:underline"
              to={child.link}
            >
              {child.label}
            </NavLink>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <>
        <When if={isMobile}>
          <div
            className="p-1 pl-0 mr-2 pointer"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <When
              if={isOpenMenu}
              render={ <CloseIcon className="text-orange-500" /> }
              elseRender={ <MenuOutlinedIcon className="text-sky-400" /> }
            />
          </div>
        </When>

        <AnimatePresence
          exitBeforeEnter
          initial={false}
        >
          <When if={isMobile && isOpenMenu}>
            <motion.div
              animate={{ left: 0 }}
              initial={{ left: "-100%" }}
              exit={{ left: "-100%" }}
              className="absolute z-50 top-full left-0 min-w-[300px]"
            >
              <ul className="flex flex-col menu-main bg-sky-700 py-5 px-4">
                {menuList.map((item, index) => (
                  <li
                    className="pb-2"
                    key={index}
                  >
                    <MainLink item={item} />
                    <ChildrenLink item={item} />
                  </li>
                ))}
              </ul>
            </motion.div>
          </When>
        </AnimatePresence>
    </>
  )
}
export default MenuMobile