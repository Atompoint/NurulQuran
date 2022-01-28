import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import { PopularSection } from "../components/PopularSection/PopularSection"
import RecentlyAdded from "../components/RecentlyAdded/RecentlyAdded"
import { useSelector, useDispatch } from "react-redux"
import { fetchItems } from "../Redux/allItems"

export const query = graphql`
  query MyQuery {
    allContentfulNurulquran {
      edges {
        node {
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
        }
      }
    }
  }
`

const IndexPage = ({ data }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const items = data?.allContentfulNurulquran?.edges
    dispatch(fetchItems(items))
  }, [])
  return (
    <div>
      <PopularSection />
      <RecentlyAdded />
    </div>
  )
}

export default IndexPage
