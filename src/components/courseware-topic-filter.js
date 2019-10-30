import React from 'react';
import Select, { Option } from '@material/react-select';
import { FaCircleNotch } from 'react-icons/fa';
import Store from '../store/store';
import useTopicQuery from '../hooks/use-topic-query';
import './courseware-filters.scss';
import shortid from '../scripts/shortid';

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
  const topicOptions = topics.map(topic => (
    <Option value={topic} key={shortid()}>{topic}</Option>
  ));
  return (
    <div className="filter">
      <Select
        enhanced
        outlined
        label="Topic"
        value={courseTopic}
        onEnhancedChange={changeCourseTopic}
        className="filter"
      >
        <Option value="All" key={shortid()}>All</Option>
        {topicOptions}
      </Select>
    </div>
  );
};

export default CoursewareTopicFilter;
