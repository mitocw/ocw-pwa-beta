import React from 'react';
import CoursewareBreadcrumb from './courseware-breadcrumb';
import styles from './courseware-header.module.scss';

const CoursewareHeader = ({
  className,
  url,
  title,
  visits,
}) => (
  <div className={className}>
    <div className={styles.subheader}>
      <h3 className={styles.title}>{title}</h3>
      <h5 className={styles.visits}>
        Visits:&nbsp;
        {visits}
      </h5>
    </div>
    <CoursewareBreadcrumb url={url} />
  </div>
);

export default CoursewareHeader;
