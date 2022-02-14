import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import WhatsappOutlinedIcon from "@mui/icons-material/WhatsappOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AudioModal from "../Modal/AudioModal";
import { useDispatch, useSelector } from "react-redux";
import { setIsPlayedItems } from "../../Redux/historyItems";
import useMediaQuery from "@mui/material/useMediaQuery";
import img from "../../images/gatsby-icon.png";
import {
  counterSlice,
  setIsFavouriteItems,
  setIsRemoveFavouriteItems,
} from "../../Redux/favouriteItems";

import { setIsCacheItems, removeCacheItems } from "../../Redux/cacheItems";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Snackbar from "@mui/material/Snackbar";
import Popover from "@mui/material/Popover";

import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import "./RecentBox.css";

const RecentBox = ({ item, isCategoryCard, searchModal }) => {
  const dispatch = useDispatch();
  const historyItems = useSelector((state) => state.isPlayed.value);
  const favouriteItems = useSelector((state) => state.isFavourite.value);
  const cacheItems = useSelector((state) => state.isCached.value);

  const [isOpen, setIsOpen] = useState(false);
  const [isFav, setIsFav] = useState(true);
  const [isCache, setIsCache] = useState(true);
  const [isAudio, setIsAudio] = useState(undefined);
  const [audioPlaylist, setAudioPlatlist] = useState([]);

  const [isPlay, setIsPlay] = useState(false);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const { name, image, audio } = isCategoryCard ? item : item.node;
  const URL = `http:${audio.file.url}`;
  const theme = useTheme();
  const matches = useMediaQuery("(min-width:600px)");
  const isMobile = useMediaQuery("(min-width:600px)");

  // console.log("^^^^^" , item)
  // console.log("Checking" , item)

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickPopover = (event) => {
    setChecked((prev) => !prev);

    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  useEffect(() => {
    let foundFavItem = favouriteItems.find((obj) =>
      obj.node ? obj.node?.name === name : obj.name === name
    );
    if (foundFavItem) {
      setIsFav(false);
    } else {
      setIsFav(true);
    }

    let foundCacheItem = cacheItems.find((obj) =>
      obj.node ? obj.node?.name === name : obj.name === name
    );
    if (foundCacheItem) {
      setIsCache(false);
    } else {
      setIsCache(true);
    }
  }, [favouriteItems]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlay(true);

    let obj = historyItems.find((obj) => obj?.node?.name === name);
    if (!obj) {
      dispatch(setIsPlayedItems(item));
    }
  };

  const download = () => {
    fetch(audio.file.url).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = audio.file.url;
        a.click();
      });
    });
  };

  const handleChange = () => {};
  const setFavourite = () => {
    // let obj = historyItems.find(obj => obj?.node?.name === item.node.name)
    // console.log("item is", item)
    dispatch(setIsFavouriteItems(item));
    // console.log("Before",isFav)
    setIsFav(true);
    // console.log("After",isFav)
  };
  const removeFavourite = () => {
    // console.log("Remove fav",item)
    dispatch(setIsRemoveFavouriteItems(item));
    setIsFav(false);
  };

  //this is the method which triggers on the click of cache button//
  const setCache = () => {
    fetch(audio.file.url).then((response) => {
      response.blob().then(async (blob) => {
        //  let url = window.URL.createObjectURL(blob)
        //  console.log("blob" , blob)

        //converting blob to array buffer//
        const newBlob = await new Response(blob).arrayBuffer();
        //  console.log("new Blob is" , newBlob)

        // //converting array buffet to base64//
        const newbase65 = _arrayBufferToBase64(newBlob);
        // console.log("base64" , newbase65)

        //  //setting base64 value to local Storage//

        const obj = {
          fileName: name,
          fileData: newbase65,
        };
        dispatch(setIsCacheItems(item));
        localStorage.setItem(obj.fileName, JSON.stringify(obj));
        setIsCache(!isCache);
      });
    });
  };

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  //-------------------End ------------------//

  const removeCache = () => {
    setIsCache(!isCache);
    dispatch(removeCacheItems(item));
    localStorage.removeItem(name);

    // console.log("###", item)
  };

  return (
    <div>
      {isOpen && (
        <AudioModal
          openModal={isOpen}
          setIsOpen={setIsOpen}
          name={name}
          audio={audio.file.url}
          setIsPlay={setIsPlay}
        />
      )}
      <Card className="recentCard">
        <div style={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{
              width: matches ? 120 : 100,
              height: matches && !searchModal ? 130 : 110,
            }}
            image="https://add.nurulquran.com/images/song/164241245230.png"
            alt="Nurul Quran"
          />
          <Box>
            <div style={{ display: "flex", height: matches && "65px" }}>
              <CardContent sx={{ display: "flex" }}>
                <>
                  {!isPlay ? (
                    <PlayArrowIcon
                      onClick={handleOpen}
                      sx={{ cursor: "pointer" }}
                    />
                  ) : (
                    <PauseIcon sx={{ cursor: "pointer" }} />
                  )}
                </>
                <div>
                  <Tooltip title={name}>
                    <Typography
                      component="div"
                      variant="subtitle1"
                      style={{ paddingLeft: "1rem" }}
                      className="forEllipses"
                    >
                      {name}
                    </Typography>
                  </Tooltip>
                </div>
              </CardContent>
            </div>

            <div className="icons">
              <Tooltip title="Download offline">
                <IconButton>
                  <DownloadForOfflineIcon
                    onClick={isCache ? setCache : removeCache}
                    sx={{ color: isCache ? "#797979" : "#24D366" }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add to favourite">
                <IconButton>
                  <FavoriteBorderIcon
                    onClick={isFav ? setFavourite : removeFavourite}
                    sx={{ color: isFav ? "#797979" : "#F06464" }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download online">
                <IconButton>
                  <DownloadIcon onClick={download} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share links">
                <IconButton>
                  <ShareIcon onClick={handleClickPopover} />
                </IconButton>
              </Tooltip>

              {checked && (
                <div className="shareIcons">
                  <Popover
                    id={id}
                    open={openPopover}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{ left: 500, top: 500 }}
                    anchorPosition={{ left: "500", top: "500" }}
                  >
                    <InsertLinkOutlinedIcon
                      sx={{ cursor: "pointer", fontSize: "2rem" }}
                      onClick={() => {
                        navigator.clipboard.writeText(URL);
                        handleClick();
                      }}
                    />
                    <TwitterShareButton url={URL} title={name} quote={name}>
                      <TwitterIcon sx={{ color: "#05ABED" }} />
                    </TwitterShareButton>
                    <EmailShareButton url={URL} title={name} quote={name}>
                      <MailOutlineOutlinedIcon sx={{ color: "#878787" }} />
                    </EmailShareButton>
                    <WhatsappShareButton url={URL} title={name} quote={name}>
                      <WhatsappOutlinedIcon sx={{ color: "#24D366" }} />
                    </WhatsappShareButton>
                    <FacebookShareButton url={URL} title={name} quote={name}>
                      <FacebookOutlinedIcon sx={{ color: "#3C5997" }} />
                    </FacebookShareButton>
                  </Popover>
                </div>
              )}
            </div>
          </Box>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          message="Copied"
        />
      </Card>
    </div>
  );
};

export default RecentBox;
