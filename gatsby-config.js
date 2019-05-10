module.exports = {
  siteMetadata: {
    title: 'OCW',
    description: 'OCW Progressive Web Application',
    author: 'Daniel Seaton and Jean-Michel Claus',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    'gatsby-plugin-sass',
  ],
};
