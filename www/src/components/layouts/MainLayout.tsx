/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useSiteMetadata } from "hooks"

import Header from "../Header"
import Footer from "../Footer"
import { makeStyles } from "@material-ui/core/styles"

interface Props {
  children?: any
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

const Layout = ({ children }: Props) => {
  const {
    siteMetadata: { title: siteTitle },
  } = useSiteMetadata()

  const classes = useStyles()
  return (
    <>
      <Header siteTitle={siteTitle} />
      {children}
      <Footer />
    </>
  )
}

export default Layout
