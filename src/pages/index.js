import React from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';
import useContentfulData from '../hooks/use-contentful-data';
import SEO from '../components/seo';
import Layout from '../components/layout';
import CoursewareList from '../components/courseware-list';

const IndexPage = () => {
  const { title, description } = useSiteMetadata();
  const coursewares = useContentfulData();

  return (
    <Layout>
      <SEO
        siteTitle={title}
        siteDescription={description}
      />
      <CoursewareList coursewares={coursewares} />
    </Layout>
  );
};

export default IndexPage;
