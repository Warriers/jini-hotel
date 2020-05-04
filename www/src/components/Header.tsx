import React from "react"
import clsx from "clsx"
import { withStyles, createStyles } from "@material-ui/core/styles"
import { Link } from "gatsby-theme-material-ui"
import MuiLink from "@material-ui/core/Link"
import AppBar from "./AppBar"
import Toolbar, { styles as toolbarStyles } from "./Toolbar"

import { Theme } from "@material-ui/core/styles/createMuiTheme"
import { Routes } from "utils"
import { navigate } from "gatsby"
import { useIdentityContext } from "react-netlify-identity"

const styles = (theme: Theme) =>
  createStyles({
    title: {
      fontSize: 24,
    },
    placeholder: toolbarStyles(theme).root,
    toolbar: {
      justifyContent: "space-between",
    },
    left: {
      flex: 1,
    },
    leftLinkActive: {
      color: theme.palette.common.white,
    },
    right: {
      flex: 1,
      display: "flex",
      justifyContent: "flex-end",
    },
    rightLink: {
      fontSize: 16,
      color: theme.palette.common.white,
      marginLeft: theme.spacing(3),
    },
    linkSecondary: {
      color: theme.palette.secondary.main,
    },
  })

interface Props {
  siteTitle: string
  classes: {
    [key: string]: any
  }
}

const defaultProps: Omit<Props, "classes"> = {
  siteTitle: "Jini Hotel",
}

const Header = (props: Props) => {
  const { siteTitle, classes } = props
  const { isLoggedIn } = useIdentityContext()
  return (
    <header>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            to="/"
          >
            {siteTitle}
          </Link>
          <div className={classes.right}>
            {!isLoggedIn && (
              <>
                {" "}
                <MuiLink
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(`/app/${Routes.login}/`)
                  }}
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                  href={`/app/${Routes.login}/`}
                >
                  {"Sign In"}
                </MuiLink>
                <MuiLink
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(`/app/${Routes.signup}/`)
                  }}
                  variant="h6"
                  underline="none"
                  className={clsx(classes.rightLink, classes.linkSecondary)}
                  href={`/app/${Routes.signup}/`}
                >
                  {"Sign Up"}
                </MuiLink>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </header>
  )
}

Header.defaultProps = defaultProps

export default withStyles(styles)(Header)
