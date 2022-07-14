import React from "react"
import useMediaQuery from "@mui/material/useMediaQuery"

import HeaderSearch from "../HeaderSearch"
import NavAccount from "../../containers/NavAccount/NavAccount"
import useAuthen from "../../hooks/useAuthen"
import When from "../When"
import Logo from "./Logo"
import MenuMobile from "./MenuMobile"
import MenuDesktop from "./MenuDesktop"


const Header = () => {
  const isMobile = useMediaQuery("(max-width:768.98px)")
  const { isLogin } = useAuthen()
  
  return (
    <header className="header pt-4 pb-4 flex bg-sky-900 sticky top-0 z-50">
      <div className="c-container m-auto flex align-center">
        <MenuMobile isMobile={isMobile} />
        <Logo />
        <MenuDesktop isMobile={isMobile} />

        <div className="ml-auto flex">
          <When
            if={isLogin}
            render={<NavAccount />}
          />
          <HeaderSearch
            className="pointer ml-4"
            isMobile={isMobile}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
