import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Select, { Option } from '@material/react-select';
import { FaCircleNotch } from 'react-icons/fa';
import './courseware-filters.scss';
import shortid from '../scripts/shortid';

const CoursewareLevelFilter = ({ courseLevel, changeCourseLevel }) => {
  const ALL_LEVELS = gql`
    {
      allCoursewares(first: 100) {
        courseLevel
      }
    }
  `;

  return (
    <div className="filter">
      <Query query={ALL_LEVELS}>
        {({ data: { allCoursewares }, loading }) => {
          if (loading) {
            return <FaCircleNotch className="spinner" />;
          }
          let levels = allCoursewares.map(item => item.courseLevel);
          levels = levels.filter((item, index) => levels.indexOf(item) === index);
          const levelOptions = levels.map(level => (
            <Option value={level} key={shortid()}>{level}</Option>
          ));

          return (
            <>
              <Select
                enhanced
                outlined
                label="Level"
                value={courseLevel}
                onEnhancedChange={changeCourseLevel}
                className="filter"
              >
                <Option value="All" key={shortid()}>All</Option>
                {levelOptions}
              </Select>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default CoursewareLevelFilter;
