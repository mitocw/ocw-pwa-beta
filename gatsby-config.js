/* eslint-disable no-multi-spaces */
let contentfulConfig;

try {
  // Load the Contentful config from the .contentful.json
  // eslint-disable-next-line global-require
  contentfulConfig = require('./.contentful')
} catch (_) {
  // eslint-disable-next-line no-console
  console.log('Could not find contenful configuaration file');
}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
};

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
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
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
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
  ],
};
