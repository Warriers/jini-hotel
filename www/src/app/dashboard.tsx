import React from "react"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import clsx from "clsx"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import { Chart, Deposits, Orders } from "components/Dashboard"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  drawerPaper: {
    width: drawerWidth,
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
}))

const drawerWidth = 240

const Dashboard = () => {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={classes.paper}>
            <Orders />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
