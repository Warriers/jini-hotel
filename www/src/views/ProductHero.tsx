import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Button from "components/Button";
import Typography from "components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";

import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { navigate } from "gatsby";
import { Routes } from "utils";

const backgroundImage =
  "https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80";

const styles = (theme: Theme) =>
  createStyles({
    background: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundColor: "#7fc7d9", // Average color of the background image.
      backgroundPosition: "center",
    },
    button: {
      minWidth: 200,
    },
    h5: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      [theme.breakpoints.up("sm")]: {
        marginTop: theme.spacing(10),
      },
    },
    more: {
      marginTop: theme.spacing(2),
    },
  });

interface Props {
  classes: {
    [key: string]: any;
  };
}

const ProductHero = (props: Props) => {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Upgrade your Sundays
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        onClick={(e) => {
          e.preventDefault()
          navigate(`/app/${Routes.signup}/`)
        }}
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}

export default withStyles(styles)(ProductHero);
