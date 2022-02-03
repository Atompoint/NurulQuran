import React, { useState, useEffect } from "react"
import { styled, useTheme, alpha } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import CssBaseline from "@mui/material/CssBaseline"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import { useStaticQuery, graphql } from "gatsby"
import Collapse from "@mui/material/Collapse"
import StarBorder from "@mui/icons-material/StarBorder"
import ListItemButton from "@mui/material/ListItemButton"
import "./Muidrawer.css"
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import favourite from "../../pages/favourite"
import { Link } from "gatsby"

const drawerWidth = 240

const Main = styled("main", { shouldForwardProp: prop => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}))
//search
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}))

const MuiDrawer = () => {
  const data = useStaticQuery(graphql`
    query MenuBarQuery {
      allContentfulCategories {
        edges {
          node {
            categoryName
            subCategoryName {
              categoryName
              pageData {
                name
              }
            }
            isParent
          }
        }
      }
    }
  `)
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const openMenuItem = Boolean(anchorEl)
  const [menuItems, setMenuItems] = useState([])
  const [parentItems, setParentItems] = useState([])
  const [openMenuDropdown, setOpenMenuDropdown] = React.useState({})

  const handleDropdown = categoryName => {
    setOpenMenuDropdown(prevState => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }))
  }

  useEffect(() => {
    setMenuItems(data?.allContentfulCategories?.edges)
    if (menuItems.length > 0) {
      // const postIds = menuItems.map(({ node: item }) => item.categoryName)
      const filteredParentItems = menuItems.filter(
        ({ node: item }) => item.isParent === true
      )
      setParentItems(filteredParentItems)
      console.log("**", filteredParentItems)
    }
  }, [menuItems])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  console.log("menu Bar ", menuItems)

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <div className="header">
              <div>
                <Link
                  to="/"
                  style={{
                    color: `white`,
                    textDecoration: `none`,
                  }}
                >
                  <Typography variant="h6" noWrap component="div">
                    NurulQuran
                  </Typography>
                </Link>
              </div>
              <div>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </div>
            </div>
            <Link
              to="favourite"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              <FavoriteBorderIcon
                sx={{ padding: "0rem 0.5rem", fontSize: "2.5rem" }}
              />
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {parentItems.map((item, index) => (
              <>
                <ListItemButton
                  onClick={() => handleDropdown(item.node.categoryName)}
                >
                  <ListItemText primary={item.node.categoryName} />
                  {item.node.subCategoryName?.length > 0 &&
                    (openMenuDropdown[item.node.categoryName] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    ))}
                </ListItemButton>
                {item.node.subCategoryName?.length > 0 &&
                  item.node.subCategoryName?.map(subCategory => {
                    return (
                      <Collapse
                        in={openMenuDropdown[item.node.categoryName]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary={subCategory.categoryName} />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    )
                  })}
              </>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
    </div>
  )
}

export default MuiDrawer
