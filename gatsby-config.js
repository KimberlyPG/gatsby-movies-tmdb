require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {}, 
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: "gatsby-source-tmdb",
      options: {
        apiKey: process.env.GATSBY_API_KEY,
        sessionID: process.env.GATSBY_SESSION_ID,
      }
    },
    `gatsby-plugin-netlify`
  ],
}
