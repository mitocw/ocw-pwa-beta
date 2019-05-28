import React from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';
import useIndexPageData from '../hooks/use-index-page-data';
import SEO from '../components/seo';
import Layout from '../components/layout';
import CoursewareList from '../components/courseware-list';

const IndexPage = () => {
  const { siteMetadata } = useSiteMetadata();
  // const coursewareUids = useIndexPageData();
  const coursewareUids = useIndexPageData().slice(0, -1); // TODO: remove

  return (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <CoursewareList coursewareUids={coursewareUids} />
    </Layout>
  );
};

export default IndexPage;
