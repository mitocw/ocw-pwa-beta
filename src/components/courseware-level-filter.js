import React from 'react';
import Select, { Option } from '@material/react-select';
import { FaCircleNotch } from 'react-icons/fa';
import useLevelQuery from '../hooks/use-level-query';
import './courseware-filters.scss';
import shortid from '../scripts/shortid';

const CoursewareLevelFilter = ({ courseLevel, changeCourseLevel }) => {
  const { data: { allCoursewares }, loading } = useLevelQuery();
  if (loading) {
    return (
      <div className="filter">
        <FaCircleNotch className="spinner" />
      </div>
    );
  }
  let levels = allCoursewares.map(item => item.courseLevel);
  levels = levels.filter((item, index) => levels.indexOf(item) === index);
  const levelOptions = levels.map(level => (
    <Option value={level} key={shortid()}>{level}</Option>
  ));
  return (
    <div className="filter">
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
    </div>
  );
};

export default CoursewareLevelFilter;
