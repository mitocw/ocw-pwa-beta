import React from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import styles from './courseware-list.module.scss';

const CoursewareLoading = () => (
  <>
    <div className={styles.coursewareNumber}>
      <span>Courses</span>
    </div>
    <div className={styles.coursewareListLoading}>
      <FaCircleNotch className={styles.spinner} />
    </div>
  </>
);

export default CoursewareLoading;
