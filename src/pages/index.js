import React from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';
import useContentfulData from '../hooks/use-contentful-data';
import SEO from '../components/seo';
import Layout from '../components/layout';
import CoursewareList from '../components/courseware-list';

const IndexPage = () => {
  const { siteMetadata } = useSiteMetadata();
  const coursewares = useContentfulData();

  return (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <CoursewareList coursewares={coursewares} />
    </Layout>
  );
};

export default IndexPage;
