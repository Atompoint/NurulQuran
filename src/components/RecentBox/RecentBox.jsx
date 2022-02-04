import React, { useState, useEffect } from "react"
import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
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
import img from "../../images/gatsby-icon.png"
import {
  counterSlice,
  setIsFavouriteItems,
  setIsRemoveFavouriteItems,
} from "../../Redux/favouriteItems"

import { setIsCacheItems, removeCacheItems } from "../../Redux/cacheItems"
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline"
import Snackbar from "@mui/material/Snackbar"
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"
import "./RecentBox.css"

const RecentBox = ({ item }) => {
  const dispatch = useDispatch()
  const historyItems = useSelector(state => state.isPlayed.value)
  const favouriteItems = useSelector(state => state.isFavourite.value)
  const cacheItems = useSelector(state => state.isCached.value)

  const [isOpen, setIsOpen] = useState(false)
  const [isFav, setIsFav] = useState(true)
  const [isCache, setIsCache] = useState(true)
  const [isAudio, setIsAudio] = useState(undefined)

  const [isPlay, setIsPlay] = useState(false)
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = React.useState(false)
  const { name, image, audio } = item.node
  const URL = `http:${audio.file.url}`
  const theme = useTheme()

  useEffect(() => {
    let foundFavItem = favouriteItems.find(
      obj => obj?.node?.name === item.node.name
    )
    if (foundFavItem) {
      setIsFav(false)
    } else {
      setIsFav(true)
    }

    let foundCacheItem = cacheItems.find(
      obj => obj?.node?.name === item.node.name
    )
    if (foundCacheItem) {
      setIsCache(false)
    } else {
      setIsCache(true)
    }
  }, [favouriteItems])

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
    setIsPlay(true)

    let obj = historyItems.find(obj => obj?.node?.name === item.node.name)
    if (!obj) {
      dispatch(setIsPlayedItems(item))
    }
  }

  const download = () => {
    fetch(audio.file.url).then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement("a")
        a.href = url
        a.download = audio.file.url
        a.click()
      })
    })
  }

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
  }

  const setCache = () => {
    // let obj = historyItems.find(obj => obj?.node?.name === item.node.name)
    // console.log("item is", item)
    // dispatch(setIsCacheItems(item))
    // setIsCache(!isCache)
    fetch(audio.file.url).then(response => {
      response.blob().then(async blob => {
        let url = window.URL.createObjectURL(blob)
        const newBlob = await new Response(blob).arrayBuffer()
        const newbase65 = _arrayBufferToBase64(newBlob)
        // addDataIntoCache("Audio", "https://localhost:8000", newbase65)
        localStorage.setItem("Audio", newbase65)
        const aud = localStorage.getItem("Audio")

        const base64toArray = base64ToArrayBuffer(aud)
        const audioObj = new Audio(base64toArray)
        setIsAudio(audioObj)
        // audioObj.play()
        // audioObj.addEventListener("canplaythrough", event => {
        //   /* the audio is now playable; play it if permissions allow */
        //   audioObj.play()
        // })

        console.log("Audio oobj", audioObj)
        console.log("************", base64toArray)
      })
    })
  }

  function _arrayBufferToBase64(buffer) {
    var binary = ""
    var bytes = new Uint8Array(buffer)
    var len = bytes.byteLength
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }

  function base64ToArrayBuffer(base64) {
    let binaryString = window.atob(base64)
    let binaryLength = binaryString.length
    let bytes = new Uint8Array(binaryLength)

    for (let i = 0; i < binaryLength; i++) {
      let ascii = binaryString.charCodeAt(i)
      bytes[i] = ascii
    }
    return bytes
  }

  const addDataIntoCache = (cacheName, url, response) => {
    // Converting our response into Actual Response form
    const data = new Response(JSON.stringify(response))

    if ("caches" in window) {
      // Opening given cache and putting our data into it
      caches.open(cacheName).then(cache => {
        cache.put(url, data)
        alert("Data Added into cache!")
      })
    }
  }
  const removeCache = () => {
    setIsCache(!isCache)
    dispatch(removeCacheItems(item))
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
          setIsPlay={setIsPlay}
        />
      )}
      <Card className="recentCard">
        <div style={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 120, height: 130 }}
            image="https://add.nurulquran.com/images/song/164241245230.png"
            alt="Nurul Quran"
          />
          <Box>
            <div style={{ display: "flex" }}>
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
                <>
                  <Typography
                    component="div"
                    variant="subtitle1"
                    style={{ paddingLeft: "1rem" }}
                  >
                    {name}
                  </Typography>
                </>
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
                  <ShareIcon onClick={handleChange} />
                </IconButton>
              </Tooltip>

              {checked && (
                <div className="shareIcons">
                  <InsertLinkOutlinedIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      navigator.clipboard.writeText(URL)
                      handleClick()
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

      <audio>
        <source src={isAudio} type="audio/mpeg" />
        No audio support.
      </audio>
    </div>
  )
}

export default RecentBox
