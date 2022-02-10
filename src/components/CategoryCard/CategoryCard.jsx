import React,{useEffect, useState} from 'react'
import Grid from "@mui/material/Grid"
import RecentBox from '../RecentBox/RecentBox'

const CategoryCard = ({item}) => {
  const [pageData, setPageData] = useState()
    


    useEffect(()=>{

        setPageData(item?.node?.pageData)


        // if(item?.node?.subCategoryName)
        // {
        //     setPageData(item?.node?.subCategoryName)

        // }
        // else{

        //     setPageData(item?.node?.pageData)
        // }

    },[])
    console.log("from Parent Card" , item.node.subCategoryName)
    console.log("from Child Card" , item.node.pageData)
  return (
    <div className="recentlyAddedLeftSec">
    {pageData?.map((items) => {
      return (
        <div>
          <Grid>
            <RecentBox item={items} isCategoryCard={true} />
          </Grid>
        </div>
      )
    })}
  </div>
  )
}

export default CategoryCard