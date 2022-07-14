import React from 'react'
import { NavLink } from 'react-router-dom'
import { menuList } from '../../settings/menuList'

const MenuDesktop = ({ isMobile }) => {
  if(isMobile) return null

  const MainLink = ({item}) => {
    if (item.link.length > 0) return (
      <NavLink
        className="text-white font-bold hover:underline hover:underline-offset-2"
        to={item.link}
      >
        {item.label}
      </NavLink>
    )
    return (
      <p className="text-white font-bold hover:underline hover:underline-offset-2 pointer">
        {item.label}
      </p>
    )
  }

  const ChildrenLink = ({item}) => {
    if(item.children.length === 0) return 
    return (
      <ul className="submenu absolute top-full bg-white rounded-md shadow-sm p-2 min-w-[200px]">
        {item.children.map((child, index) => (
          <li
            className=""
            key={index}
          >
            <NavLink
              className="w-full block text-sm whitespace-nowrap bg-gray-50 border-t border-b border-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md"
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
    <ul className="flex space-x-4 menu-main">
      {menuList.map((item, index) => (
        <li
          className="items-center flex relative menu-l1"
          key={index}
        >
          <MainLink item={item} />
          <ChildrenLink item={item} />
        </li>
      ))}
    </ul>
  )
}

export default MenuDesktop