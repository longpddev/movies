import React, { useState } from "react"
import { motion } from "framer-motion"
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined"
import clsx from "clsx"
const Collapse = ({ name, children, className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  return (
    <div
      className={clsx(
        "shadow-lg rounded-lg border border-gray-300 overflow-hidden",
        className
      )}
    >
      <div
        className="flex justify-between pointer noselect py-3 px-4"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <strong>{name}</strong>
        <motion.div animate={{ rotate: isCollapsed ? 0 : 90 }}>
          <ChevronRightOutlinedIcon />
        </motion.div>
      </div>
      <motion.div
        className="overflow-hidden"
        animate={{ height: isCollapsed ? 0 : "auto" }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default Collapse
