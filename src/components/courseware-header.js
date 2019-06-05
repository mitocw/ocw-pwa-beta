import React from 'react';
import CoursewareBreadcrumb from './courseware-breadcrumb';
import styles from './courseware-header.module.scss';

const CoursewareHeader = ({
  className,
  url,
  title,
}) => (
  <div className={className}>
    <h3 className={styles.title}>{title}</h3>
    <CoursewareBreadcrumb url={url} />
  </div>
);

export default CoursewareHeader;
