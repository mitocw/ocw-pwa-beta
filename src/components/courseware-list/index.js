import React from 'react';
import CoursewareCard from '../courseware-card';
import styles from './courseware-list.module.scss';

const CoursewareList = ({coursewares}) => {
  const coursewareCards = coursewares.map(({node}) => (
    <CoursewareCard node={node} />
  ));

  return (
    <div className={styles.coursewareList}>
      {coursewareCards}
    </div>
  );
}

export default CoursewareList;
