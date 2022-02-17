import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "./FavouriteSection.css";
import Typography from "@mui/material/Typography";
import HistoryBox from "../HistoryBox/HistoryBox";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import useMediaQuery from "@mui/material/useMediaQuery";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const FavouriteSection = () => {
  const cacheItems = useSelector((state) => state.isCached.value);
  const favouriteItems = useSelector((state) => state.isFavourite.value);
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <div className="favouriteSect">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xl={6} lg={6} md={12} xs={12}>
          <Typography
            variant={matches ? "h4" : "h5"}
            gutterBottom
            component="div"
            color="#106B66"
            sx={{ fontWeight: "bold", padding: "1rem 0rem" }}
          >
            Favourite
          </Typography>
          <div className="recentlyAddedInnerFavouriteSec">
            <Scrollbars style={{ height: 240 }}>
              {favouriteItems?.map((items, index) => {
                return (
                  <div key={index}>
                    <Grid>
                      <HistoryBox item={items} isfavourite={true} />
                    </Grid>
                  </div>
                );
              })}
            </Scrollbars>
          </div>
        </Grid>
        <Grid item xl={6} lg={6} md={12} xs={12}>
          <Typography
            variant="h4"
            variant={matches ? "h4" : "h5"}
            gutterBottom
            component="div"
            color="#106B66"
            sx={{ fontWeight: "bold", padding: "1rem 0rem" }}
          >
            Cache
          </Typography>
          <div className="recentlyAddedInnerHistorySec">
            <Scrollbars style={{ height: 240 }}>
              {cacheItems?.map((items, index) => {
                return (
                  <div key={index}>
                    <Grid>
                      <HistoryBox item={items} isCache={true} />
                    </Grid>
                  </div>
                );
              })}
            </Scrollbars>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FavouriteSection;
