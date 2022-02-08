import React, { useState } from "react"
import "./PopularCard.css"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import Tooltip from "@mui/material/Tooltip"
import AudioModal from "../Modal/AudioModal"

const PopularCard = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }

  // console.log("$$$$", item.node)
  const { name, image, audio } = item.node

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
      <Card className="popularCard" onClick={handleOpen}>
        <CardMedia
        className="cardMedia"
          component="img"
         
          image={image.file.url}
          alt="Nurul Quran"
        />
        <CardContent className="cardContent">
          <Tooltip title={name}>
            <Typography variant="body1" color="text.secondary" align="center">
              {/* {name} */}
              {name.length > 20 ? name.slice(0, 15) + "..." : name}
            </Typography>
          </Tooltip>
        </CardContent>
      </Card>
    </div>
  )
}

export default PopularCard
