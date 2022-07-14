import React from "react"
import { NavLink } from "react-router-dom"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import clsx from "clsx"

const SeconMenu = ({ menu = [] }) => {
  return (
    <div className="bg-white w-full px-4 border-b border-gray-300">
      <ul className="flex flex-wrap mx-auto max-w-max menu-main">
        {menu.map((item, index) => (
          <li
            key={index}
            className={clsx("relative menu-l1", {
              pointer: item?.children?.length,
            })}
          >
            {item?.link ? (
              <NavLink
                to={item.link}
                className="flex justify-between py-2 block px-4 border-b-4 border-transparent hover:border-sky-300"
              >
                <span>{item.label}</span>
                {item?.children && (
                  <ArrowDropDownIcon />
                )}
              </NavLink>
            ) : (
              <p className="flex justify-between py-2 block px-4 border-b-4 border-transparent hover:border-sky-300">
                <span>{item.label}</span>
                <ArrowDropDownIcon />
              </p>
            )}
            {item?.children && (
              <ul className="submenu absolute top-full bg-white rounded-md shadow-sm p-2 min-w-[200px]">
                {item?.children?.map((child, index) => (
                  <li
                    className=""
                    key={index}
                  >
                    {child?.link ? (
                      <NavLink
                        className="w-full block text-sm whitespace-nowrap bg-gray-50 border-t border-b border-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md"
                        to={child.link}
                      >
                        {child.label}
                      </NavLink>
                    ) : (
                      <p className="w-full block text-sm whitespace-nowrap bg-gray-50 border-t border-b border-gray-100 hover:bg-gray-300 px-3 py-2 rounded-md">
                        {child.label}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}

          </li>
        ))}
      </ul>
    </div>
  )
}

export default SeconMenu
