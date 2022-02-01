import React, { useState } from "react"
import ReactAudioPlayer from "react-audio-player"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Typography from "@mui/material/Typography"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const AudioModal = ({ openModal, name, audio, setIsOpen }) => {
  const handleClose = () => setIsOpen(false)
  const [open, setOpen] = React.useState(openModal)

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="modalBox">
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="div"
              color="#106B66"
              sx={{ fontWeight: "bold" }}
            >
              {name}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {name}
            </Typography>
            <ReactAudioPlayer src={audio} autoPlay controls />
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default AudioModal
