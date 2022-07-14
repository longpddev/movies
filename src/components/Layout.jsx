import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import ToTop from './ToTop'
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ToTop/>
    </>
  )
}

export default Layout
