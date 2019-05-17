import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ siteTitle, siteDescription }) => (
  <Helmet>
    <html lang="en-US" />
    <title>{siteTitle}</title>
    <meta name="description" content={siteDescription} />
  </Helmet>
);


export default SEO;
