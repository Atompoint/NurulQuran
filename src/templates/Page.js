import * as React from "react"
import { styled } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useStyles } from "./Page.styles"
import CardMedia from "@mui/material/CardMedia"

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import {
  setIsFavouriteItems,
  setIsRemoveFavouriteItems,
} from "../Redux/favouriteItems"
import { graphql } from "gatsby"
import CategoryCard from "../components/CategoryCard/CategoryCard"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}))

const Page = ({ data, pageContext }) => {
  const favouriteItems = useSelector(state => state.isFavourite.value)

  const dispatch = useDispatch()

  // const items = allItems[0]
  const matches = useMediaQuery("(min-width:600px)")
  const classes = useStyles()
  const [isFav, setIsFav] = useState(false)
  const [pageData, setPageData] = useState([])
  const name = pageContext?.categoryName

  useEffect(() => {
    let foundFavItem = favouriteItems.find(obj =>
      obj.node ? obj.node?.name === name : obj.name === name
    )
    if (foundFavItem) {
      setIsFav(true)
    } else {
      setIsFav(false)
    }

    const items = data?.allContentfulCategories?.edges
    // console.log("^^^^^^" , items)

    setPageData(items)
  }, [favouriteItems])

  // console.log("Dynamic data " , pageContext.categoryName)
  // console.log("Dynamic Page data ", data)

  const item = {
    name: pageContext?.categoryName,
    redirectLink: `/${pageContext?.categoryName
      .split(" ")
      .join("")
      .toLowerCase()}`,
    isCategory: true,
  }
  const setFavourite = () => {
    // let obj = historyItems.find(obj => obj?.node?.name === item.node.name)

    if (item?.node) {
      dispatch(setIsFavouriteItems(item))
    } else {
      const obj = {
        node: item,
      }
      dispatch(setIsFavouriteItems(obj))
    }

    // console.log("Before",isFav)
    setIsFav(true)
    // console.log("After",isFav)
  }
  const removeFavourite = () => {
    // console.log("Remove fav",item)
    dispatch(setIsRemoveFavouriteItems(item))
    setIsFav(false)
  }

  return (
    <div className={classes.rootStyle}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xl={5} lg={5} md={5} xs={12} container rowSpacing={1}>
          <Grid item xs={12}>
            <div className={classes.categoryBox}>
              <CardMedia
                component="img"
                sx={{
                  width: matches ? 150 : 100,
                  height: matches ? 150 : 100,
                  borderRadius: "50%",
                }}
                image="https://add.nurulquran.com/images/song/164241245230.png"
                alt="Nurul Quran"
              />
              <>
                <Typography
                  component="div"
                  variant="h6"
                  style={{ fontWeight: "bold", padding: "0.5rem 0rem" }}
                >
                  {pageContext?.categoryName}
                </Typography>
              </>
              <>
                <FavoriteBorderIcon
                  onClick={isFav ? removeFavourite : setFavourite}
                  sx={{
                    cursor: "pointer",
                    color: isFav ? "#F06464" : "#797979",
                  }}
                />
              </>
            </div>
          </Grid>
        </Grid>
        <Grid item xl={7} lg={7} md={7} xs={12}>
          <div className="recentlyAddedLeftSec">
            {pageData?.map((items, index) => {
              return (
                <div key={index}>
                  <Grid>
                    <CategoryCard item={items} categoryName={name} />
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

export const PageQuery = graphql`
  query GETPAGEDATA($categoryName: String) {
    allContentfulCategories(filter: { categoryName: { eq: $categoryName } }) {
      edges {
        node {
          categoryName
          pageData {
            name
            audio {
              file {
                url
              }
            }
            image {
              file {
                url
              }
            }
            categories {
              categoryName
            }
          }
          subCategoryName {
            categoryName
            pageData {
              name
              audio {
                file {
                  url
                }
              }
              image {
                file {
                  url
                }
              }
              categories {
                categoryName
              }
            }
          }
        }
      }
    }
  }
`
