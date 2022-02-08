import React from "react"
import Grid from "@mui/material/Grid"
import ImageSlider from "../ImageSlider/ImageSlider"
import "./PopularSection.css"
import Typography from "@mui/material/Typography"
import useMediaQuery from '@mui/material/useMediaQuery';


export const PopularSection = () => {
const matches = useMediaQuery('(min-width:600px)');

  return (
    <div className="popularSec">
      <Grid container spacing={2}>
        <div className="popularHead">
          <Typography
            className="PopularHeading"
            variant={matches ? "h4" : "h5"}
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
