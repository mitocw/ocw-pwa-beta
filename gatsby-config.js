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
  ],
};
