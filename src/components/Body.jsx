import React from 'react'
import { createPortal } from "react-dom"

const Body = ({ children }) => createPortal(children, document.body)

export default Body