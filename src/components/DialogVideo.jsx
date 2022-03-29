import React, { useState } from "react"
import ReactPlayer from "react-player"
import Dialog from "@mui/material/Dialog"

const DialogVideo = ({ code, type = "youtube", isOpen = false, children, wrapClass }) => {
  const [open, setOpen] = useState(isOpen)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <div
        className={wrapClass}
        onClick={() => setOpen(!open)}
      >
        {children}
      </div>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
      >
        <div className="w-full h-full relative pt-[56.25%]">
          <div className="absolute inset-0 w-full h-full">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${code}`}
              width='100%'
              height='100%'
            />
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default DialogVideo
