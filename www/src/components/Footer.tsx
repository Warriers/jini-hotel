import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import MuiLink from "@material-ui/core/Link"
import {Link} from "gatsby"
import Container from "@material-ui/core/Container"
import Typography from "./Typography"
import TextField from "./TextField"
import { useSiteMetadata } from "hooks"

import { Theme } from "@material-ui/core/styles/createMuiTheme"

const Copyright = () => (
  <Typography variant="body2" color="textSecondary">
    {"Copyright © "}
    <Link component={Link} color="inherit" to="/">
      {useSiteMetadata().siteMetadata.title}
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
)

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: "flex",
  },
  icon: {
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
}))

const LANGUAGES = [
  {
    code: "en-US",
    name: "English",
  },
  {
    code: "fr-FR",
    name: "Français",
  },
]

const Footer = () => {
  const classes = useStyles()

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item className={classes.icons}>
                <a href="#" className={classes.icon}>
                  <img
                    src={require("images/onepirate/appFooterFacebook.png")}
                    alt="Facebook"
                  />
                </a>
                <a href="#" className={classes.icon}>
                  <img
                    src={require("images/onepirate/appFooterTwitter.png")}
                    alt="Twitter"
                  />
                </a>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {/* <Typography variant="caption">
              {"Icons made by "}
              <Link
                href="https://www.freepik.com"
                rel="sponsored"
                title="Freepik"
              >
                Freepik
              </Link>
              {" from "}
              <Link
                href="https://www.flaticon.com"
                rel="sponsored"
                title="Flaticon"
              >
                www.flaticon.com
              </Link>
              {" is licensed by "}
              <Link
                href="https://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC 3.0 BY
              </Link>
            </Typography> */}
          </Grid>
        </Grid>
      </Container>
    </Typography>
  )
}

export default Footer
