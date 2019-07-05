import React, { useState, useCallback } from 'react';
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
  const [cardType, setCardType] = useState('regular');

  const changeCourseTopic = useCallback(
    (index, item) => setCourseTopic(item.getAttribute('data-value')),
  );
  const changeCourseLevel = useCallback(
    (index, item) => setCourseLevel(item.getAttribute('data-value')),
  );
  const changeCardType = useCallback(
    event => setCardType(event.currentTarget.dataset.cardType),
  );
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
        cardType={cardType}
        changeCardType={changeCardType}
      />
    </Layout>
  );
};

export default IndexPage;
