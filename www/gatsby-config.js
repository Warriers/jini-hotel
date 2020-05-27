const path = require(`path`)
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = {
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': ''
        }
      })
    )
  },

  siteMetadata: {
    title: "Jini Hotel",
    description: `Jini Hackathon web app`,
    author: `@TheFirstMe`,
  },

  plugins: [
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] }
    },
    {
      resolve: require.resolve(`./src/plugins/gatsby-plugin-netlify-identity`),
      options: {
        url: `https://jini-hotel.netlify.app` // required!
      }
    },
    `gatsby-plugin-netlify`,
    // `gatsby-plugin-netlify-identity`
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
    `gatsby-plugin-styled-components`,
  ],
};
