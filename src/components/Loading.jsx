import clsx from "clsx"
import React from "react"
import ReactLoading from "react-loading"
const Loading = ({
  type = "balls",
  color = "rgb(6 182 212)",
  className,
  height = 64,
  width = 64,
}) => (
  <div className={clsx("flex justify-center px-2 py-1 w-full", className)}>
    <ReactLoading
      type={type}
      color={color}
      height={height}
      width={width}
    />
  </div>
)

export default Loading
