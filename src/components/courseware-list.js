import React from 'react';
import CoursewareCard from './courseware-card';
import shortid from '../scripts/shortid';
import styles from './courseware-list.module.scss';

const CoursewareList = ({ coursewareUids }) => {
  const coursewareCards = coursewareUids.map(coursewareUid => (
    <CoursewareCard coursewareUid={coursewareUid} key={shortid()} />
  ));

  return (
    <div className={styles.coursewareList}>
      {coursewareCards}
    </div>
  );
};

export default CoursewareList;
