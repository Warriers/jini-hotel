module.exports = {
  siteMetadata: {
    title: "Jini Hotel",
    description: `Jini Hackathon web app`,
    author: `@TheFirstMe`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-theme-material-ui`,
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: `Roboto Condensed`,
                variants: [`300`, `400`, `700`],
              },
              {
                family: `Work Sans`,
                variants: [`300`, `400`, `700`],
              },
            ],
          },
        },
      },
    },
    `gatsby-plugin-typescript`,
  ],
};
