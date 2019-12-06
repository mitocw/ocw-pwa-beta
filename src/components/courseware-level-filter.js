import React from 'react';
import { Select } from '@rmwc/select';
import { FaCircleNotch } from 'react-icons/fa';
import Store from '../store/store';
import useLevelQuery from '../hooks/use-level-query';
import './courseware-filters.scss';

const CoursewareLevelFilter = () => {
  const {
    courseLevel,
    changeCourseLevel,
  } = Store.useContainer();
  const { data, loading } = useLevelQuery();
  if (loading) {
    return (
      <div className="filter">
        <FaCircleNotch className="spinner" />
      </div>
    );
  }
  const { allCoursewares } = data;
  let levels = allCoursewares.map(item => item.courseLevel);
  levels = levels.filter((item, index) => levels.indexOf(item) === index);
  const levelOptions = [
    { label: 'All', value: 'All' },
    ...levels.map(level => ({ label: level, value: level })),
  ];

  return (
    <div className="filter">
      <Select
        enhanced
        outlined
        label="Level"
        value={courseLevel}
        onEnhancedChange={changeCourseLevel}
        className="filter"
        options={levelOptions}
      />
    </div>
  );
};

export default CoursewareLevelFilter;
