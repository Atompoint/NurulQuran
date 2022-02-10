import * as React from "react"
import { useEffect } from "react"
import { graphql } from "gatsby"
import { PopularSection } from "../components/PopularSection/PopularSection"
import RecentlyAdded from "../components/RecentlyAdded/RecentlyAdded"
import { useDispatch } from "react-redux"
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
let  str = "Hello Worls"
  str=str.split(" ").join("");
  console.log("str is" , str)

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
