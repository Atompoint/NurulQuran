import React, { useState } from "react"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import IconButton from "@mui/material/IconButton"
import AudioModal from "../Modal/AudioModal"
import { setIsRemoveFavouriteItems } from "../../Redux/favouriteItems"
import { useDispatch, useSelector } from "react-redux"
import { removeCacheItems } from "../../Redux/cacheItems"
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline"

import "./HistoryBox.css"

const HistoryBox = ({ isfavourite, item, isCache }) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const { name, image, audio } = item.node

  const handleOpen = () => {
    setIsOpen(true)
  }
  const removeFavourite = () => {
    dispatch(setIsRemoveFavouriteItems(item))
  }
  const removeCache = () => {
    dispatch(removeCacheItems(item))
  }
  return (
    <div>
      {isOpen && (
        <AudioModal
          openModal={isOpen}
          setIsOpen={setIsOpen}
          name={name}
          audio={audio.file.url}
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
            onClick={handleOpen}
          >
            {item?.node?.name}
          </Typography>
        </div>
        {isfavourite ? (
          <IconButton>
            <FavoriteBorderIcon
              onClick={removeFavourite}
              sx={{ color: "#F06464" }}
            />
          </IconButton>
        ) : isCache ? (
          <IconButton>
            <DownloadForOfflineIcon
              onClick={removeCache}
              sx={{ color: "#24D366" }}
            />
          </IconButton>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default HistoryBox
