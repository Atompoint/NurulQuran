import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import RecentBox from "../RecentBox/RecentBox";
import { listItemSecondaryActionClasses } from "@mui/material";

const CategoryCard = ({ item, categoryName }) => {
  const [pageData, setPageData] = useState();

  useEffect(() => {
    if (item?.node?.subCategoryName) {
      setPageData(item?.node?.subCategoryName);
    } else {
      setPageData(item?.node?.pageData);
    }
  }, []);
  // console.log("from Parent Card" , item.node.subCategoryName)
  // console.log("from Child Card" , item.node.pageData)
  return (
    <div>
      {pageData?.map((items, index) => {
        return (
          <div key={index}>
            {items.pageData ? (
              items.pageData.map((innerItem, index) => {
                return (
                  <Grid key={index}>
                    <RecentBox
                      item={innerItem}
                      isCategoryCard={true}
                      categoryName={categoryName}
                    />
                  </Grid>
                );
              })
            ) : (
              <Grid>
                <RecentBox
                  item={items}
                  isCategoryCard={true}
                  categoryName={categoryName}
                />
              </Grid>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryCard;
