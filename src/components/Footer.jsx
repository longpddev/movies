import React from "react"
import { Link } from "react-router-dom"
import logo from "../images/logoFooter.svg"
const Footer = () => {
  return (
    <div className="bg-sky-900">
      <div className="c-container flex flex-wrap pt-8">
        <div className="md:w-1/4 w-full pb-8">
          <Link to="/">
            <img
              className="max-w-[130px] mx-auto "
              src={logo}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="md:w-3/4 pb-8 flex flex-col justify-center">
          <p className="text-xl text-white text-center">Project reactjs clone website
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noreferrer"
            >
              &nbsp;https://www.themoviedb.org&nbsp;
            </a> 
            for learn reactjs use api of themoviedb
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
