import * as React from "react";
import Grid from "@mui/material/Grid";
import "./RecentlyAdded.css";
import Typography from "@mui/material/Typography";
import RecentBox from "../RecentBox/RecentBox";
import HistoryBox from "../HistoryBox/HistoryBox";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Scrollbars } from "react-custom-scrollbars";

const RecentlyAdded = () => {
  const allItems = useSelector((state) => state.items.value);
  const historyItems = useSelector((state) => state.isPlayed.value);
  const favouriteItems = useSelector((state) => state.isFavourite.value);
  const items = allItems[0];
  // console.log("All items",items)
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <div className="recentlyAddedSec">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xl={6} lg={6} md={12} xs={12}>
          <Typography
            variant={matches ? "h4" : "h5"}
            gutterBottom
            component="div"
            color="#106B66"
            sx={{ fontWeight: "bold" }}
          >
            Recently Added
          </Typography>
          <div className="recentlyAddedLeftSec">
            <Scrollbars style={{ height: 570 }}>
              {items?.map((items, index) => {
                return (
                  <div key={index}>
                    <Grid>
                      <RecentBox item={items.node} recentBox={true} />
                    </Grid>
                  </div>
                );
              })}
            </Scrollbars>
          </div>
        </Grid>
        <Grid item xl={6} lg={6} md={12} xs={12} container rowSpacing={1}>
          <Grid item xs={12}>
            <Typography
              variant={matches ? "h4" : "h5"}
              gutterBottom
              component="div"
              color="#106B66"
              sx={{
                fontWeight: "bold",
                padding: matches ? "0rem 0rem" : "1rem 0rem",
                marginTop: matches ? "0rem" : "1rem",
              }}
            >
              History List
            </Typography>
            <div className="recentlyAddedInnerHistorySec">
              <Scrollbars style={{ height: 240 }}>
                {historyItems?.map((items, index) => {
                  return (
                    <div key={index}>
                      <Grid>
                        <HistoryBox item={items.node} />
                      </Grid>
                    </div>
                  );
                })}
              </Scrollbars>
            </div>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant={matches ? "h4" : "h5"}
              gutterBottom
              component="div"
              color="#106B66"
              sx={{
                fontWeight: "bold",
                padding: matches ? "0rem 0rem" : "1rem 0rem",
                marginTop: matches ? "2rem" : "1rem",
              }}
            >
              Favourite List
            </Typography>
            <div className="recentlyAddedInnerFavouriteSec">
              <Scrollbars style={{ height: 240 }}>
                {favouriteItems?.map((items, index) => {
                  return (
                    <div key={index}>
                      <Grid>
                        <HistoryBox item={items.node} isfavourite={true} />
                      </Grid>
                    </div>
                  );
                })}
              </Scrollbars>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecentlyAdded;
