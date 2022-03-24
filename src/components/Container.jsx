import React from 'react'

const Body = ({ children }) => {
  return <div className="c-container mb-10 pt-10">{children}</div>
}
const Wrap = ({ children }) => <div className="flex flex-wrap">{children}</div>
const Sidebar = ({ children }) => (
  <div className="xl:w-1/5 w-full lg:w-1/4 mb-8 lg:mb-0">{children}</div>
)

const Main = ({ children }) => (
  <div className="xl:w-4/5 lg:pl-10 w-full lg:w-3/4">{children}</div>
)

const Container = {
  Body,
  Wrap,
  Sidebar,
  Main,
}

export default Container
