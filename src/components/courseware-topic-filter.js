import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Select, { Option } from '@material/react-select';
import { FaCircleNotch } from 'react-icons/fa';
import './courseware-filters.scss';
import shortid from '../scripts/shortid';

const CoursewareTopicFilter = ({ courseTopic, changeCourseTopic }) => {
  const ALL_TOPICS = gql`
    {
      allCourseCollections(first: 100) {
        ocwFeature
      }
    }
  `;

  return (
    <div className="filter">
      <Query query={ALL_TOPICS}>
        {({ data: { allCourseCollections }, loading }) => {
          if (loading) {
            return <FaCircleNotch className="spinner" />;
          }
          let topics = allCourseCollections.map(item => item.ocwFeature);
          topics = topics.filter((item, index) => topics.indexOf(item) === index);
          const topicOptions = topics.map(topic => (
            <Option value={topic} key={shortid()}>{topic}</Option>
          ));

          return (
            <>
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
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default CoursewareTopicFilter;
