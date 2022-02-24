import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import MuiDrawer from "../components/MuiDrawer/MuiDrawer"
import Grid from "@mui/material/Grid"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import Header from "./header"
import "./layout.css"
const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#106B66",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#179992",
    },
  },
})

const Layout = ({ children }) => {
  const [margin, setMargin] = useState(false)
  const matches = useMediaQuery("(min-width:1025px)")
  const isMobile = useMediaQuery("(min-width:600px)")

  return (
    <ThemeProvider theme={theme}>
      <MuiDrawer setMargin={setMargin} />

      <div
        style={{
          margin: `0 auto`,
          padding: isMobile ? "0rem 2rem" : "0rem 1rem",
          marginLeft: margin && matches ? "0px" : "0px",
          transition: "all 300ms ease-in-out",
          // padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
      </div>
      <footer className="footerSection">
        <Grid container>
          <Grid item xs={12} lg={8} className="footerHead">
            <p>
              NurulQuran Ⓒ 2022 {!isMobile && <br />}
              powered by Atompoint
            </p>
          </Grid>
          <Grid item xs={0} lg={4} className="footerInnerSection"></Grid>
        </Grid>
      </footer>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
