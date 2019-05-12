module.exports = {
  siteMetadata: {
    title: 'OCW',
    description: 'OCW Progressive Web Application',
    author: 'Daniel Seaton and Jean-Michel Claus',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: ['./node_modules'],
      },
    },
  ],
};
