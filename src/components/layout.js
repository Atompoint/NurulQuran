import React,{useState} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import MuiDrawer from "../components/MuiDrawer/MuiDrawer"
import Grid from "@mui/material/Grid"
import { createTheme, ThemeProvider } from "@mui/material/styles"

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


  return (
    <ThemeProvider theme={theme}>
      <MuiDrawer setMargin={setMargin}/>

      <div
        style={{
          margin: `0 auto`,
          padding: "0rem 2rem",
          marginLeft: margin ? "240px" : "0px",
          transition: "all 300ms ease-in-out",
          // padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main >{children}</main>
      </div>
      <footer className="footerSection">
        <Grid container>
          <Grid xs={8} className="footerHead">
            <p>Build NurulQuran @2022</p>
          </Grid>
          <Grid xs={4} className="footerInnerSection"></Grid>
        </Grid>
      </footer>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
