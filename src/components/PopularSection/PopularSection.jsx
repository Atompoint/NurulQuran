import React from "react"
import Grid from "@mui/material/Grid"
import ImageSlider from "../ImageSlider/ImageSlider"
import "./PopularSection.css"
import Typography from "@mui/material/Typography"

export const PopularSection = () => {
  return (
    <div className="popularSec">
      <Grid container spacing={2}>
        <div className="popularHead">
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            color="#106B66"
            sx={{ fontWeight: "bold" }}
          >
            Most Popular
          </Typography>
        </div>
        <Grid item xs={12}>
          <ImageSlider />
        </Grid>
      </Grid>
    </div>
  )
}
