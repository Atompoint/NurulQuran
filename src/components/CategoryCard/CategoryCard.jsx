import React,{useEffect, useState} from 'react'
import Grid from "@mui/material/Grid"
import RecentBox from '../RecentBox/RecentBox'
import { listItemSecondaryActionClasses } from '@mui/material'

const CategoryCard = ({item}) => {
  const [pageData, setPageData] = useState()
    


    useEffect(()=>{

        if(item?.node?.subCategoryName)
        {
            setPageData(item?.node?.subCategoryName)

        }
        else{

            setPageData(item?.node?.pageData)
        }

    },[])
    // console.log("from Parent Card" , item.node.subCategoryName)
    // console.log("from Child Card" , item.node.pageData)
  return (
    <div >
    {pageData?.map((items) => {
      return (
        <div>
        
    {
      items.pageData ?  items.pageData.map((innerItem)=>{
        return(
        <Grid>
        <RecentBox item={innerItem}  isCategoryCard={true}/>
          </Grid>
        )
      }
        )
      :
      (
        <Grid>
        <RecentBox item={items}  isCategoryCard={true}/>
          </Grid>
        )

      
    }
    
        </div>
      )
    })}
  </div>
  )
}

export default CategoryCard