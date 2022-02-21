import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import AudioModal from "../Modal/AudioModal";
import { setIsRemoveFavouriteItems } from "../../Redux/favouriteItems";
import { useDispatch } from "react-redux";
import { removeCacheItems } from "../../Redux/cacheItems";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { get, del } from "idb-keyval";

import { navigate } from "gatsby";

import "./HistoryBox.css";

const HistoryBox = ({ isfavourite, item, isCache }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isAudio, setIsAudio] = useState("");
  const [category, setCategory] = useState("");

  const { name, image, audio, isCategory, redirectLink, categories } = item;
  useEffect(() => {
    if (categories) {
      const categoryNameee = categories[0].categoryName;
      setCategory(categoryNameee);
    }
  }, [categories]);

  const handleOpen = () => {
    if (isCategory) {
      navigate(`/${item.name.split(" ").join("").toLowerCase()}`);
    } else {
      setIsOpen(true);
    }
  };

  const handleOpenCache = async () => {
    //  //Retrieving base64 value from local Storage//
    const getAudio = await get(name);

    const audiodata = JSON.parse(getAudio);
    const audioFileOf = audiodata.fileData;

    //  //Converting base64 to Array Buffer//
    const base64toArray = base64ToArrayBuffer(audioFileOf);
    // console.log("base 64 to array is" , base64toArray)

    const blob1 = new Blob([base64toArray], { type: "audio/wav" });
    var audioElem = document.createElement("audio");
    audioElem.src = window.URL.createObjectURL(blob1);
    // console.log("audio elem " , audioElem)
    setIsAudio(audioElem.src);
    // console.log("cache " , audioElem.src)
    setIsOpen(true);
  };
  function base64ToArrayBuffer(base64) {
    let binaryString = window.atob(base64);
    let binaryLength = binaryString.length;
    let bytes = new Uint8Array(binaryLength);

    for (let i = 0; i < binaryLength; i++) {
      let ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }
  const removeFavourite = () => {
    dispatch(setIsRemoveFavouriteItems(item));
  };
  const removeCache = () => {
    dispatch(removeCacheItems(item));
    del(name);
  };
  return (
    <div>
      {isOpen && !isCategory && (
        <AudioModal
          openModal={isOpen}
          setIsOpen={setIsOpen}
          name={name}
          categoryName={category}
          audio={isAudio || audio.file.url}
        />
      )}
      <div className="historyBox">
        <div style={{ display: "flex" }}>
          <Avatar
            alt="Remy Sharp"
            src="https://add.nurulquran.com/images/www/ic_music_node.png"
          />
          <Typography
            component="div"
            variant="subtitle1"
            sx={{ paddingLeft: "2rem" }}
            onClick={isCache ? handleOpenCache : handleOpen}
          >
            {name}
          </Typography>
        </div>
        {isfavourite ? (
          <IconButton onClick={removeFavourite}>
            <FavoriteBorderIcon sx={{ color: "#F06464" }} />
          </IconButton>
        ) : isCache ? (
          <IconButton onClick={removeCache}>
            <DownloadForOfflineIcon sx={{ color: "#24D366" }} />
          </IconButton>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default HistoryBox;
