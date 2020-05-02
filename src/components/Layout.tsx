/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { useSiteMetadata } from "hooks";

import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children?: any;
}

const Layout = ({ children }: Props) => {
  const {
    siteMetadata: { title: siteTitle },
  } = useSiteMetadata();

  return (
    <>
      <Header siteTitle={siteTitle} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
