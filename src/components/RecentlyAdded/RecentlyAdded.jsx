import * as React from "react"
import { styled } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import "./RecentlyAdded.css"
import Typography from "@mui/material/Typography"
import RecentBox from "../RecentBox/RecentBox"
import HistoryBox from "../HistoryBox/HistoryBox"
import { useSelector } from "react-redux"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}))
const product = [
  {
    productname: "Call Ana Care  installation",
    time: "9:00 Am",
    avatar: "https://avatars.githubusercontent.com/u/1674036?s=40&v=4",
    background: "#ECBB3D",
  },
  {
    productname: "Product Delievery  time",
    time: "Today",
    avatar: "https://avatars.githubusercontent.com/u/1674036?s=40&v=4",
    background: "#80C7D0",
  },
  {
    productname: "Follow up with Cambria",
    time: "Today",
    avatar: "https://avatars.githubusercontent.com/u/1674036?s=40&v=4",
    background: "#F98341",
  },
  {
    productname: "Brochure  Review",
    time: "Tomorrow",
    avatar: "https://avatars.githubusercontent.com/u/1674036?s=40&v=4",
    background: "#B1A8DE",
  },
  {
    productname: "Brian Noble Pick Up",
    time: "2:00 Pm",
    avatar: "https://avatars.githubusercontent.com/u/1674036?s=40&v=4",
    background: "#80C7D0",
  },
  {
    productname: "Call Ana Care  installation",
    time: "9:00 Am",
    avatar: "https://avatars.githubusercontent.com/u/1674036?s=40&v=4",
    background: "#ECBB3D",
  },
  {
    productname: "Product Delievery  time",
    time: "Today",
    avatar: "https://avatars.githubusercontent.com/u/1674036?s=40&v=4",
    background: "#80C7D0",
  },
  {
    productname: "Follow up with Cambria",
    time: "Today",
    avatar: "https://avatars.githubusercontent.com/u/1674036?s=40&v=4",
    background: "#F98341",
  },
]

const RecentlyAdded = () => {
  const allItems = useSelector(state => state.items.value)
  const items = allItems[0]

  return (
    <div className="recentlyAddedSec">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xl={6} lg={6} md={12} xs={12}>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            color="#106B66"
            sx={{ fontWeight: "bold" }}
          >
            Recently Added
          </Typography>
          <div className="recentlyAddedLeftSec">
            {items.map(items => {
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
        <Grid item xl={6} lg={6} md={12} xs={12} container rowSpacing={1}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              color="#106B66"
              sx={{ fontWeight: "bold" }}
            >
              History
            </Typography>
            <div className="recentlyAddedInnerHistorySec">
              {product.map(items => {
                return (
                  <div>
                    <Grid>
                      <HistoryBox item={items} />
                    </Grid>
                  </div>
                )
              })}
            </div>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              color="#106B66"
              sx={{ fontWeight: "bold", marginTop: "1rem" }}
            >
              Favourite
            </Typography>
            <div className="recentlyAddedInnerFavouriteSec">
              {product.map(items => {
                return (
                  <div>
                    <Grid>
                      <HistoryBox item={items} isfavourite={true} />
                    </Grid>
                  </div>
                )
              })}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default RecentlyAdded
