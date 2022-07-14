import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react"
import clsx from "clsx"
import { motion } from "framer-motion"
const context = createContext()

const Tabs = ({ children, onChange }) => {
  const [active, setActive] = useState(0)
  const handleChange = useCallback(
    (value) => {
      typeof onChange === "function" && onChange(value)
      setActive(value)
    },
    [onChange]
  )
  return (
    <context.Provider value={[active, handleChange]}>
      <div className="">{children}</div>
    </context.Provider>
  )
}

const Label = ({ title, value, isDefault }) => {
  const [active, setActive] = useContext(context)
  useEffect(() => {
    isDefault && setActive(value)
  }, [])
  return (
    <li
      className={clsx(
        "px-2 py-1 border-b-2 border-transparent hover:bg-gray-100 pointer",
        {
          "border-sky-400": active === value,
        }
      )}
      onClick={() => setActive(value)}
    >
      <span className="text-md font-semibold">{title}</span>
    </li>
  )
}

const Item = ({ children, value, lazy }) => {
  const [active] = useContext(context)
  return active === value ? (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {typeof lazy === "function" ? lazy(value) : children}
    </motion.div>
  ) : (
    <></>
  )
}

const Header = ({ children }) => <ul className="flex space-x-3">{children}</ul>

const Body = ({ children, className }) => (
  <div className={clsx(className)}>{children}</div>
)

Tabs.Header = Header
Tabs.Item = Item
Tabs.Label = Label
Tabs.Body = Body

export default Tabs
