import React from "react"
import { NavLink } from "react-router-dom"
import logo from "../images/logoFooter.svg"
const Footer = () => {
  return (
    <div className="bg-sky-900 min-h-[300px]">
      <div className="c-container flex flex-wrap py-8">
        <div className="md:w-1/4 sm:w-1/2 w-full mb-5 max-w-[200px]">
          <NavLink to="/">
            <img className="max-w-[130px]" src={logo} alt="Logo" />
          </NavLink>
        </div>
        {Array(3)
          .fill(1)
          .map((item, index) => (
            <div
              className="md:w-1/4 sm:w-1/2 pl-3 w-full mb-5 max-w-[200px]"
              key={index}
            >
              <h3 className="text-xl font-bold text-white">The Basics</h3>
              <ul>
                {Array(4)
                  .fill(1)
                  .map((item, index) => (
                    <li key={index}>
                      <NavLink to="/" className="hover:underline text-white">
                        My link
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Footer
