import * as React from "react"
import { styled } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import RecentBox from "../components/RecentBox/RecentBox"
import HistoryBox from "../components/HistoryBox/HistoryBox"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useMediaQuery from '@mui/material/useMediaQuery';
import {useStyles} from './Page.styles'
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { setIsFavouriteItems } from "../Redux/favouriteItems"



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}))

const Page = () => {
  const allItems = useSelector(state => state.items.value)
  const historyItems = useSelector(state => state.isPlayed.value)
  const favouriteItems = useSelector(state => state.isFavourite.value)
  const items = allItems[0]
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles()
  const [isFav, setIsFav] = useState(true)

  const handleOpen = () => {
  
    
    setIsFav(!isFav)

    
  }


  return (
    <div className={classes.rootStyle}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
       
        <Grid item xl={5} lg={5} md={12} xs={12} container rowSpacing={1}>
          <Grid item xs={12}>
        
            <div className={classes.categoryBox}>
       

          <CardMedia
            component="img"
            sx={{ width: matches ? 150 : 100 , height: matches ? 150 : 100 , borderRadius:"50%"}}
            image="https://add.nurulquran.com/images/song/164241245230.png"
            alt="Nurul Quran"
            />
                <>
                  <Typography
                    component="div"
                    variant="h6"
                    style={{ fontWeight:"bold", padding:"0.5rem 0rem" }}
                  >
                    Quran
                  </Typography>
                </>
                <>
                  
                    <FavoriteBorderIcon
                      onClick={handleOpen}
                      
                    sx={{ cursor:"pointer" , color: isFav ? "#797979" : "#F06464" }}
                    />

                </>
       
            </div>
        
          </Grid>

          
        </Grid>
        <Grid item xl={7} lg={7} md={12} xs={12}>
        
          <div className="recentlyAddedLeftSec">
            {items?.map(items => {
              return (
                <div>
                  <Grid>
                    <RecentBox item={items} />
                  </Grid>
                </div>
              )
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Page
