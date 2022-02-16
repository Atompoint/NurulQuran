import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import useMediaQuery from "@mui/material/useMediaQuery";

const AudioModal = ({
  openModal,
  name,
  audio,
  setIsOpen,
  setIsPlay,
  categoryName,
}) => {
  const handleClose = () => {
    setIsOpen(false);

    if (setIsPlay) {
      setIsPlay(false);
    }
  };
  const [open, setOpen] = React.useState(openModal);
  const isMobile = useMediaQuery("(min-width:600px)");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? 400 : 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
            <div style={{ display: "flex" }}>
              <CardMedia
                component="img"
                sx={{ width: 80, height: 80 }}
                image="https://add.nurulquran.com/images/song/164241245230.png"
                alt="Nurul Quran"
              />
              <div style={{ marginLeft: "1rem" }}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="div"
                  color="#106B66"
                  sx={{ fontWeight: "bold", marginTop: "0rem" }}
                >
                  {name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  id="transition-modal-description"
                  sx={{ mt: 0 }}
                >
                  {categoryName}
                </Typography>
              </div>
            </div>
            <ReactAudioPlayer src={audio} autoPlay controls />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AudioModal;
