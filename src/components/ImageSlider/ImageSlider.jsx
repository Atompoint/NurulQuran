import React from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import "./ImageSlider.css"
import PopularCard from "../PopularCard/PopularCard"
import Grid from "@mui/material/Grid"
import { useSelector } from "react-redux"

const ImageSlider = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    speed: 500,
    adaptiveHeight: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const allItems = useSelector(state => state.items?.value || [])
  const items = allItems?.[0] || []

  return (
    <div>
      <Slider {...settings}>
        {items?.map(items => {
          return (
            <div>
              <Grid>
                <PopularCard item={items} />
              </Grid>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default ImageSlider
