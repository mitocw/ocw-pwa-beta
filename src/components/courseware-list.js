import React from 'react';
import CoursewareCard from './courseware-card';
import shortid from '../scripts/shortid';
import styles from './courseware-list.module.scss';

const CoursewareList = ({ coursewares }) => {
  const coursewareCards = coursewares.map(({ node: courseware }) => (
    <CoursewareCard courseware={courseware} key={shortid()} />
  ));

  return (
    <div className={styles.coursewareList}>
      {coursewareCards}
    </div>
  );
};

export default CoursewareList;
