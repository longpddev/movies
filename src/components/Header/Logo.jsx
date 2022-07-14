import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../../images/logo.svg"

const Logo = () => (
  <NavLink
    to="/"
    className="flex items-center"
  >
    <img
      src={logo}
      alt=""
      className="w-40 mr-10 sm:w-60"
    />
  </NavLink>
)

export default Logo