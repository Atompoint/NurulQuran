import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import WhatsappOutlinedIcon from "@mui/icons-material/WhatsappOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AudioModal from "../Modal/AudioModal";
import { useDispatch, useSelector } from "react-redux";
import { setIsPlayedItems } from "../../Redux/historyItems";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  setIsFavouriteItems,
  setIsRemoveFavouriteItems,
} from "../../Redux/favouriteItems";
import { setIsCacheItems, removeCacheItems } from "../../Redux/cacheItems";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Snackbar from "@mui/material/Snackbar";
import Popover from "@mui/material/Popover";
import { set } from "idb-keyval";
import {
  LinkedinShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import "./RecentBox.css";
const RecentBox = ({
  item,

  searchModal,
  categoryName,
  recentBox,
}) => {
  const dispatch = useDispatch();
  const historyItems = useSelector((state) => state.isPlayed.value);
  const favouriteItems = useSelector((state) => state.isFavourite.value);
  const cacheItems = useSelector((state) => state.isCached.value);
  const [showTooltip, setShowTooltip] = useState(false);
  const [checkIDB, setcheckIDB] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isCache, setIsCache] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [open, setOpen] = useState(false);

  const { name, image, audio, categories } = item;

  // console.log("item issssssssss", item);

  const URL = `http:${audio.file.url}`;
  const isMobile = useMediaQuery("(min-width:600px)");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  useEffect(() => {
    let foundFavItem = favouriteItems.find(
      (obj) => (obj.node ? obj.node?.name === name : obj.name === name)
      // console.log(name, "-->", obj.node.name)
    );
    if (foundFavItem) {
      setIsFav(true);
      // console.log("**", name);
    } else {
      setIsFav(false);
    }
    let foundCacheItem = cacheItems.find((obj) =>
      obj.node ? obj.node?.name === name : obj.name === name
    );
    if (foundCacheItem) {
      setIsCache(true);
    } else {
      setIsCache(false);
    }
  }, [favouriteItems, item]);
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
    let obj = historyItems.find((obj) =>
      obj.node ? obj.node?.name === name : obj.name === name
    );
    if (!obj) {
      if (item?.node) {
        dispatch(setIsPlayedItems(item));
      } else {
        const obj = {
          node: item,
        };

        dispatch(setIsPlayedItems(obj));

        // console.log("item is", obj);
      }
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
  const setFavourite = () => {
    // let obj = historyItems.find(obj => obj?.node?.name === item.node.name)

    if (item?.node) {
      dispatch(setIsFavouriteItems(item));
    } else {
      const obj = {
        node: item,
      };
      dispatch(setIsFavouriteItems(obj));
      // console.log("item is", obj);
    }

    setIsFav(true);
  };
  const removeFavourite = () => {
    // console.log("Remove fav",item)
    dispatch(setIsRemoveFavouriteItems(item));
    setIsFav(false);
  };
  //this is the method which triggers on the click of cache button//
  const setCache = async () => {
    setcheckIDB(true);
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
        if (item?.node) {
          dispatch(setIsCacheItems(item));
        } else {
          const obj = {
            node: item,
          };
          dispatch(setIsCacheItems(obj));

          // console.log("item is", obj);
        }
        await set(obj.fileName, JSON.stringify(obj));
        // console.log(
        //   `When we queried idb-keyval for 'hello', we found: ${whatDoWeHave}`
        // );
        setIsCache(true);
        setcheckIDB(false);
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
    setIsCache(false);
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
          categoryName={
            recentBox || searchModal
              ? item.categories[0].categoryName
              : categoryName
          }
          audio={audio.file.url}
          setIsPlay={setIsPlay}
        />
      )}
      <Card className="recentCard">
        <div style={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{
              width: isMobile ? 120 : 100,
              height: isMobile && !searchModal ? 130 : 110,
            }}
            image="https://add.nurulquran.com/images/song/164241245230.png"
            alt="Nurul Quran"
          />
          <Box>
            <div style={{ display: "flex", height: isMobile && "65px" }}>
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
                  <Tooltip
                    title={name}
                    open={showTooltip}
                    onOpen={() => setShowTooltip(true)}
                    onClose={() => setShowTooltip(false)}
                  >
                    <Typography
                      onClick={() => setShowTooltip(!showTooltip)}
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
                <IconButton onClick={isCache ? removeCache : setCache}>
                  {!checkIDB ? (
                    <DownloadForOfflineIcon
                      sx={{ color: isCache ? "#24D366" : "#797979" }}
                    />
                  ) : (
                    <CircularProgress size={20} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Add to favourite">
                <IconButton onClick={isFav ? removeFavourite : setFavourite}>
                  <FavoriteBorderIcon
                    sx={{ color: isFav ? "#F06464" : "#797979" }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download online">
                <IconButton onClick={download}>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <IconButton onClick={handleClickPopover}>
                <ShareIcon />
              </IconButton>
              <Popover
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                onClose={handleClosePopover}
              >
                <div className="shareIcons">
                  <InsertLinkOutlinedIcon
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(URL);
                      handleClick();
                    }}
                  />
                  <TwitterShareButton url={URL} title={name} quote={name}>
                    <TwitterIcon
                      style={{ color: "#05ABED", marginLeft: "8px" }}
                    />
                  </TwitterShareButton>
                  <LinkedinShareButton url={URL} title={name} quote={name}>
                    <LinkedInIcon
                      style={{ color: "#878787", marginLeft: "8px" }}
                    />
                  </LinkedinShareButton>
                  <WhatsappShareButton url={URL} title={name} quote={name}>
                    <WhatsappOutlinedIcon
                      style={{ color: "#24D366", marginLeft: "8px" }}
                    />
                  </WhatsappShareButton>
                  <FacebookShareButton url={URL} title={name} quote={name}>
                    <FacebookOutlinedIcon
                      style={{ color: "#3C5997", marginLeft: "8px" }}
                    />
                  </FacebookShareButton>
                </div>
              </Popover>
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
