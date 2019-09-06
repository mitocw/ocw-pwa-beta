/* eslint-disable no-multi-spaces */
let datocmsConfig;
let datocmsOptions;
/*
  If we can read/write or just read the following end points:
  1. Content Delivery API -> GraphQL Endpoint: https://graphql.datocms.com
  2. Content Delivery API with draft content -> GraphQL Endpoint: https://graphql.datocms.com/preview
  3. Content Management API -> REST Endpoint: https://site-api.datocms.com/* (not used)
*/
const hasFullAccess = false;
const isPreview = false;
const hasLiveReload = false;

let gaConfig;
let gaOptions;

try {
  /*
    Load the DatoCMS config from ./.datocms.json
    It must have the following structure:
    {
      "fullAccessToken": full-access-token,
      "readOnlyAccessToken": read-only-access-token
    }
  */
  // eslint-disable-next-line global-require
  datocmsConfig = require('./.datocms');
  datocmsOptions = {
    apiToken: hasFullAccess ? datocmsConfig.fullAccessToken : datocmsConfig.readOnlyAccessToken,
    previewMode: isPreview,
    disableLiveReload: !hasLiveReload,
  };
} catch (_) {
  // eslint-disable-next-line no-console
  console.log('Could not find ./.datocms.js configuration file');
}

try {
  /*
    Load the Google Analytics config from ./.google-analytics.json
    It must have the following structure:
    {
      "trackingId": tracking-id
    }
  */
  // eslint-disable-next-line global-require
  gaConfig = require('./.google-analytics');
  gaOptions = {
    trackingId: gaConfig.trackingId,
    // Defines where to place the tracking script - 'true' in the head and 'false' in the body
    head: false,
    anonymize: true,
    // Respect “Do Not Track”
    respectDNT: true,
  };
} catch (_) {
  // eslint-disable-next-line no-console
  console.log('Could not find ./.google-analytics.js configuration file');
}

// Overwrite the DatoCMS and Google Analytics config with environment variables if they exist
datocmsOptions = {
  apiToken: process.env.API_TOKEN || datocmsOptions.apiToken,
  previewMode: process.env.PREVIEW_MODE || datocmsOptions.previewMode,
  disableLiveReload: process.env.DISABLE_LIVE_RELOAD || datocmsOptions.disableLiveReload,
};
gaOptions = {
  trackingId: process.env.TRACKING_ID || gaOptions.trackingId,
  head: process.env.HEAD || gaOptions.head,
  anonymize: process.env.ANONYMIZE || gaOptions.anonymize,
  respectDNT: process.env.RESPECT_DNT || gaOptions.respectDNT,
};

const { apiToken } = datocmsOptions;

if (!apiToken) {
  throw new Error(
    'DatoCms apiToken needs to be provided',
  );
}

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
    'gatsby-plugin-offline',
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
      options: { prefixes: ['/courseware/*'] },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: gaOptions,
    },
  ],
};
