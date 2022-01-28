import React from "react"
import "./PopularCard.css"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import Tooltip from "@mui/material/Tooltip"

const PopularCard = ({ item }) => {
  console.log("$$$$", item.node)
  const { name, image, audio } = item.node

  return (
    <div>
      <Card className="popularCard">
        <CardMedia
          component="img"
          height="120"
          image={image.file.url}
          alt="Nurul Quran"
        />
        <CardContent>
          <Tooltip title={name}>
            <Typography variant="body1" color="text.secondary" align="center">
              {name.length > 20 ? name.slice(0, 15) + "..." : name}
            </Typography>
          </Tooltip>
        </CardContent>
        <audio controls style={{ width: "100%", background: "#fffff" }}>
          <source src={audio.file.url} type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
      </Card>
    </div>
  )
}

export default PopularCard
