import React from "react"
import clsx from "clsx"

const Container = ({ children }) => {
  return <div className="c-container mb-10 pt-10">{children}</div>
}
const Wrap = ({ children }) => <div className="flex flex-wrap">{children}</div>
const Sidebar = ({ children }) => (
  <div className="xl:w-1/5 w-full lg:w-1/4 mb-8 lg:mb-0">{children}</div>
)

const Main = ({ children, side = 'right' }) => (
  <div
    className={clsx("xl:w-4/5 lg:pl-10 w-full lg:w-3/4", 
    {
      "lg:pl-10": side === 'right',
      "lg:pr-10": side === 'left'
    }
  )}
  >
    {children}
  </div>
)

Container.Wrap = Wrap
Container.Sidebar = Sidebar
Container.Main = Main

export default Container
