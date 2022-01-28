import React from "react"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import IconButton from "@mui/material/IconButton"

import "./HistoryBox.css"

const HistoryBox = ({ isfavourite }) => {
  return (
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
        >
          Eternal Paradise
        </Typography>
      </div>
      {isfavourite && (
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
      )}
    </div>
  )
}

export default HistoryBox
