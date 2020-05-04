import React from "react"
import { navigate, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image"

const HeroImage = () => {
    const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "./rest.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(width: 1400) {
            ...GatsbyImageSharpFixed
         }
        }
      }
    }`)
    return data;
}
export default HeroImage