import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import RecentBox from "../RecentBox/RecentBox";
import Grid from "@mui/material/Grid";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";

const SearchModal = ({ openModal, setIsOpen, setIsPlay }) => {
  const [searchField, setSearchField] = useState("");
  const [filteredItem, setFilteredItem] = useState([]);

  const allItems = useSelector((state) => state.items?.value || []);
  const items = allItems?.[0] || [];

  useEffect(() => {
    var SearchItem = ([] = items.filter(function (CurrentElem) {
      return CurrentElem.node.name
        .toLowerCase()
        .includes(searchField.toLowerCase());
    }));
    setFilteredItem(SearchItem);
  }, [searchField]);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  console.log("filtered item are ", filteredItem);

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
    width: isMobile ? 800 : 350,
    height: isMobile ? 550 : 350,
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
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <SearchIcon sx={{ color: "#106B66", mr: 1, my: 0.5 }} />

              <TextField
                id="input-with-sx"
                label="Search for Audio"
                variant="standard"
                fullWidth={true}
                onChange={handleChange}
                value={searchField}
              />
            </Box>
            <div
              style={{
                padding: "0.5rem 0rem",
                overflowY: "scroll",
                height: "450px",
              }}
            >
              {searchField !== "" &&
                filteredItem?.map((items) => {
                  return (
                    <div>
                      <Grid>
                        <RecentBox item={items} searchModal={true} />
                      </Grid>
                    </div>
                  );
                })}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SearchModal;
