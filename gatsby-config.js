/* eslint-disable import/no-extraneous-dependencies */
/*
  dotenv package is included by Gatsby
  2 files need to be present in the project's root directory,
  .env.development and .env.production and they must contain the following:

  # DatoCMS
  GATSBY_DATOCMS_FULL_ACCESS_TOKEN=yourFullAccessToken
  GATSBY_DATOCMS_READ_ONLY_ACCESS_TOKEN=yourReadOnlyAccessToken

  # Google Analytics
  GATSBY_GA_TRACKING_ID=yourGaTrackingId
  GATSBY_GA_OPTIMIZE_ID=yourGaOptimizeId
  GATSBY_GA_EXPERIMENT_ID=yourGaExperimentId
  GATSBY_GA_VARIATION_ID=yourGaVariationId
*/
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

/*
  DatoCMS
  We can read/write or just read the following end points:
  1. Content Delivery API -> GraphQL Endpoint: https://graphql.datocms.com
  2. Content Delivery API with draft content -> GraphQL Endpoint: https://graphql.datocms.com/preview
  3. Content Management API -> REST Endpoint: https://site-api.datocms.com/* (not used)
*/
const hasFullAccess = false;
// eslint-disable-next-line no-unused-vars
const datocmsOptions = {
  apiToken: hasFullAccess
    ? process.env.GATSBY_DATOCMS_FULL_ACCESS_TOKEN
    : process.env.GATSBY_DATOCMS_READ_ONLY_ACCESS_TOKEN,
  previewMode: false,
  disableLiveReload: true,
};

// Google Analytics
const gaOptions = {
  trackingId: process.env.GATSBY_GA_TRACKING_ID,
  // Defines where to place the tracking script - 'true' in the head and 'false' in the body
  head: false,
  anonymize: true,
  // Respect “Do Not Track”
  respectDNT: true,
  optimizeId: process.env.GATSBY_GA_OPTIMIZE_ID,
  experimentId: process.env.GATSBY_GA_EXPERIMENT_ID,
  variationId: process.env.GATSBY_GA_VARIATION_ID,
};

module.exports = {
  siteMetadata: {
    title: 'OCW',
    description: 'OCW Progressive Web Application',
    author: 'Daniel Seaton and Jean-Michel Claus',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: ['./node_modules'],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      // https://developers.google.com/web/fundamentals/web-app-manifest/
      options: {
        name: 'MIT OpenCourseWare',         // Used in app install prompt
        short_name: 'OCW',                  // Used in home screen or launcher
        start_url: '/',
        background_color: '#a31f34',        // MIT colors: http://web.mit.edu/graphicidentity/colors.html
        theme_color: '#a31f34',
        display: 'standalone',
        icon: 'src/images/MIT-logo.svg',    // MIT logos: http://web.mit.edu/graphicidentity/download-logos.html
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['/courseware/'],
      },
    },
    /*
      Install gatsby-source-datocms and uncomment here to use DatoCMS with Gatsby.
      We only use Apollo Client GraphQL queries for the time being.
    {
      resolve: 'gatsby-source-datocms',
      options: datocmsOptions,
    },
    */
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-stylelint',
      options: { files: ['**/*.scss'] },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/courseware/*', '/account/*'] },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: gaOptions,
    },
  ],
};
