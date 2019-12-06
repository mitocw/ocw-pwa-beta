import React from 'react';
import { Select } from '@rmwc/select';
import { FaCircleNotch } from 'react-icons/fa';
import Store from '../store/store';
import useTopicQuery from '../hooks/use-topic-query';
import './courseware-filters.scss';

const CoursewareTopicFilter = () => {
  const {
    courseTopic,
    changeCourseTopic,
  } = Store.useContainer();
  const { data, loading } = useTopicQuery();
  if (loading) {
    return (
      <div className="filter">
        <FaCircleNotch className="spinner" />
      </div>
    );
  }
  const { allCourseCollections } = data;
  let topics = allCourseCollections.map(item => item.ocwFeature);
  topics = topics.filter((item, index) => topics.indexOf(item) === index);
  const topicOptions = [
    { label: 'All', value: 'All' },
    ...topics.map(topic => ({ label: topic, value: topic })),
  ];

  return (
    <div className="filter">
      <Select
        enhanced
        outlined
        label="Topic"
        value={courseTopic}
        onEnhancedChange={changeCourseTopic}
        className="filter"
        options={topicOptions}
      />
    </div>
  );
};

export default CoursewareTopicFilter;
