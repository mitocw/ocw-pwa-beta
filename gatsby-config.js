let contentfulConfig;

try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful')
} catch (_) {}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
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
        icon: `src/images/MIT-logo.svg`,    // MIT logos: http://web.mit.edu/graphicidentity/download-logos.html
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
  ],
};
