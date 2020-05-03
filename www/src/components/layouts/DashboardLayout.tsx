import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Drawer from "@material-ui/core/Drawer"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import MuiLink from "@material-ui/core/Link"
import { Link, navigate } from "gatsby"
import MenuIcon from "@material-ui/icons/Menu"
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import NotificationsIcon from "@material-ui/icons/Notifications"
import { useSiteMetadata } from "hooks"
import { useIdentityContext } from "react-netlify-identity"

import { mainListItems, secondaryListItems } from "components/Dashboard"
import { Hidden, useTheme } from "@material-ui/core"
import SEO from "components/Seo"
import { Routes } from "utils"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MuiLink component={Link} color="textPrimary" to="/">
        {useSiteMetadata().siteMetadata.title}
      </MuiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    // transition: theme.transitions.create(["width", "margin"], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    // marginRight: 36,
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    // position: "relative",
    // whiteSpace: "nowrap",
    // width: drawerWidth,
    // transition: theme.transitions.create("width", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
    width: drawerWidth,
  },
  content: {
    // flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  // logo: {
  //   // position: "relative",
  //   padding: "15px 15px",
  //   zIndex: "4",
  //   // "&:after": {
  //   //   content: '""',
  //   //   position: "absolute",
  //   //   bottom: 0,

  //   //   height: "1px",
  //   //   right: "15px",
  //   //   width: "calc(100% - 30px)",
  //   //   // backgroundColor: "rgba(" + hexToRgb(grayColor[6]) + ", 0.3)"
  //   // }
  // },
  logoLink: {
    textTransform: "uppercase",
    // padding: "5px 0",
    display: "block",
    fontSize: "18px",
    // textAlign: "center",
    // fontWeight: "400",
    // lineHeight: "30px",
    textDecoration: "none",
    // backgroundColor: "transparent",
    // "&,&:hover": {
    //   color: "white",
    // },
  },
}))

export default function Dashboard({ children }) {
  const { logoutUser } = useIdentityContext()
  const {
    siteMetadata: { title: siteTitle },
  } = useSiteMetadata()
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const brand = (
    <Toolbar>
      <Container>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          align="center"
          noWrap
          // className={classes.title}
        >
          <MuiLink
            component={Link}
            color="primary"
            to="/"
            style={{ textDecoration: "none" }}
          >
            {siteTitle}
          </MuiLink>
        </Typography>
      </Container>
    </Toolbar>
  )

  const drawer = (
    <div>
      <div className={classes.toolbar}>{brand}</div>
      <Divider />
      <List>{mainListItems}</List>
      {/* <Divider /> */}
      {/* <List>{secondaryListItems}</List> */}
    </div>
  )

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <SEO title="Dashboard" />
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            onClick={async () => {
              await logoutUser()
              navigate(`/app/${Routes.login}/`)
            }}
            edge="end"
            aria-label="log out"
            color="inherit"
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp>
          <Drawer
            // container
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container className={classes.container}>
          {children}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  )
}
