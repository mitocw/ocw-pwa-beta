import React, { useState } from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';
import SEO from '../components/seo';
import Layout from '../components/layout';
import CoursewareTopicFilter from '../components/courseware-topic-filter';
import CoursewareLevelFilter from '../components/courseware-level-filter';
import CoursewareList from '../components/courseware-list';
import '../components/courseware-filters.scss';

const IndexPage = () => {
  // TODO Remove following when proper state management is implemented
  const { siteMetadata } = useSiteMetadata();
  const [courseTopic, setCourseTopic] = useState('Science');
  const [courseLevel, setCourseLevel] = useState('All');

  const changeCourseTopic = (index, item) => {
    setCourseTopic(item.getAttribute('data-value'));
  };
  const changeCourseLevel = (index, item) => {
    setCourseLevel(item.getAttribute('data-value'));
  };
  // End Remove

  return (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <div className="filters-container">
        <h3 className="filters-title">Filter course by</h3>
        <div className="filters">
          <CoursewareTopicFilter courseTopic={courseTopic} changeCourseTopic={changeCourseTopic} />
          <CoursewareLevelFilter courseLevel={courseLevel} changeCourseLevel={changeCourseLevel} />
        </div>
      </div>
      <CoursewareList
        courseTopic={courseTopic}
        courseLevel={courseLevel}
      />
    </Layout>
  );
};

export default IndexPage;
