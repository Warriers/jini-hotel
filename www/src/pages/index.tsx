import React from "react";
import { MainLayout as Layout, SEO } from "components";
import ProductCategories from "views/ProductCategories";
import ProductSmokingHero from "views/ProductSmokingHero";
import ProductHero from "views/ProductHero";
import ProductValues from "views/ProductValues";
import ProductHowItWorks from "views/ProductHowItWorks";
import ProductCTA from "views/ProductCTA";

const Index = () => {
  return (
    <Layout>
      <SEO title={`Home`} />
      <ProductHero />
      {/* <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero /> */}
    </Layout>
  );
};

export default Index;
