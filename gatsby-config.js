/* eslint-disable no-multi-spaces */
let contentfulConfig;
let contentfulOptions;
const isContentDelivery = false;
const contentDeliveryHost = 'cdn.contentful.com';
const contentPreviewHost = 'preview.contentful.com';

try {
  /*
    Load the Contentful config from ./.contentful.json
    It must have the following structure:
    {
      "spaceId": space-id,
      "contentDeliveryAccessToken": content-delivery-api-access-token,
      "contentPreviewAccessToken": content-preview-api-access-token,
    }
  */
  // eslint-disable-next-line global-require
  contentfulConfig = require('./.contentful');
  if (isContentDelivery) {
    contentfulOptions = {
      spaceId: contentfulConfig.spaceId,
      accessToken: contentfulConfig.contentDeliveryAccessToken,
      host: contentDeliveryHost,
    };
  } else {
    contentfulOptions = {
      spaceId: contentfulConfig.spaceId,
      accessToken: contentfulConfig.contentPreviewAccessToken,
      host: contentPreviewHost,
    };
  }
} catch (_) {
  // eslint-disable-next-line no-console
  console.log('Could not find contenful configuration file');
}

// Overwrite the Contentful config with environment variables if they exist
contentfulOptions = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulOptions.spaceId,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulOptions.accessToken,
  host: process.env.CONTENTFUL_HOST || contentfulOptions.host,
};

const { spaceId, accessToken, host } = contentfulOptions;

if (!spaceId || !accessToken || !host) {
  throw new Error(
    'Contentful spaceId, delivery token, and host need to be provided.',
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
      options: contentfulOptions,
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
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Blog',
        fieldName: 'blog',
        url: 'https://fakeql.com/graphql/28840c72a6be685665c9ca6be94786a4',
      },
    },
  ],
};
