import React, { useState, useEffect } from "react"
import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import DownloadIcon from "@mui/icons-material/Download"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import ShareIcon from "@mui/icons-material/Share"
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined"
import WhatsappOutlinedIcon from "@mui/icons-material/WhatsappOutlined"
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined"
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined"
import TwitterIcon from "@mui/icons-material/Twitter"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import AudioModal from "../Modal/AudioModal"
import { useDispatch, useSelector } from "react-redux"
import { setIsPlayedItems } from "../../Redux/historyItems"
import {
  setIsFavouriteItems,
  setIsRemoveFavouriteItems,
} from "../../Redux/favouriteItems"
import DeleteIcon from "@mui/icons-material/Delete"
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline"
import "./RecentBox.css"

const RecentBox = ({ item }) => {
  const dispatch = useDispatch()
  const historyItems = useSelector(state => state.isPlayed.value)

  const [isOpen, setIsOpen] = useState(false)
  const [isFav, setIsFav] = useState(true)

  const handleOpen = () => {
    setIsOpen(true)
    let obj = historyItems.find(obj => obj?.node?.name === item.node.name)
    if (!obj) {
      dispatch(setIsPlayedItems(item))
    }
  }
  const { name, image, audio } = item.node

  const theme = useTheme()
  const [checked, setChecked] = React.useState(false)

  const handleChange = () => {
    setChecked(prev => !prev)
  }
  const setFavourite = () => {
    // let obj = historyItems.find(obj => obj?.node?.name === item.node.name)
    console.log("item is", item)
    dispatch(setIsFavouriteItems(item))
    setIsFav(!isFav)
  }
  const removeFavourite = () => {
    setIsFav(!isFav)
    dispatch(setIsRemoveFavouriteItems(item))
    // console.log("###", item)
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
      <Card className="recentCard">
        <div style={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 100, height: 110 }}
            image="https://add.nurulquran.com/images/song/164241245230.png"
            alt="Nurul Quran"
          />
          <Box>
            <div style={{ display: "flex" }}>
              <CardContent sx={{ display: "flex" }}>
                <>
                  <Typography
                    component="div"
                    variant="subtitle1"
                    style={{ paddingLeft: "1rem" }}
                    onClick={handleOpen}
                  >
                    {name}
                  </Typography>
                </>
              </CardContent>
            </div>

            <div className="icons">
              <Tooltip title="Download offline">
                <IconButton>
                  <DownloadForOfflineIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add to favourite">
                <IconButton>
                  {isFav ? (
                    <FavoriteBorderIcon onClick={setFavourite} />
                  ) : (
                    <DeleteIcon onClick={removeFavourite} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Download online">
                <IconButton>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share links">
                <IconButton>
                  <ShareIcon onClick={handleChange} />
                </IconButton>
              </Tooltip>

              {checked && (
                <>
                  <InsertLinkOutlinedIcon />
                  <TwitterIcon />
                  <MailOutlineOutlinedIcon />
                  <WhatsappOutlinedIcon />
                  <FacebookOutlinedIcon />
                </>
              )}
            </div>
          </Box>
        </div>
      </Card>
    </div>
  )
}

export default RecentBox
