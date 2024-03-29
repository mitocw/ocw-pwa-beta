import React from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';
import SEO from '../components/seo';
import Layout from '../components/layout';
import CoursewareTopicFilter from '../components/courseware-topic-filter';
import CoursewareFeatureFilter from '../components/courseware-feature-filter';
import CoursewareLevelFilter from '../components/courseware-level-filter';
import CoursewareList from '../components/courseware-list';
import '../components/courseware-filters.scss';

const DiscoveryPage = () => {
  const { siteMetadata } = useSiteMetadata();

  return (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <div className="filters-container">
        <h3 className="filters-title">Filter course by</h3>
        <div className="filters">
          <CoursewareTopicFilter />
          <CoursewareFeatureFilter />
          <CoursewareLevelFilter />
        </div>
      </div>
      <CoursewareList />
    </Layout>
  );
};

export default DiscoveryPage;
