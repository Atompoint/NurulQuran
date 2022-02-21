import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import RecentBox from "../RecentBox/RecentBox";

const CategoryCard = ({ item, categoryName }) => {
  const [pageData, setPageData] = useState();

  useEffect(() => {
    if (item?.node?.subCategoryName) {
      setPageData(item?.node?.subCategoryName);
      console.log("from parent", item?.node?.subCategoryName);
    } else {
      setPageData(item?.node?.pageData);
      console.log("from child", item?.node?.pageData);
    }
  }, [item.node.subCategoryName, item.node.pageData]);
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
                      categoryName={items.categoryName}
                    />
                  </Grid>
                );
              })
            ) : (
              <Grid key={index}>
                <RecentBox item={items} categoryName={categoryName} />
              </Grid>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryCard;
