/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from 'react';
import { navigate } from 'gatsby';
import Store from '../store/store';
import shortid from '../scripts/shortid';
import styles from './courseware-breadcrumb.module.scss';

const CoursewareBreadcrumbs = ({ url }) => {
  const {
    setCourseSearch,
    setCourseTopic,
    setCourseFeature,
    setCourseLevel,
  } = Store.useContainer();
  const navigateToDiscovery = useCallback(
    (event) => {
      setCourseSearch('');
      setCourseTopic('All');
      setCourseFeature('Any');
      setCourseLevel('All');
      navigate('discovery');
      event.preventDefault();
    },
  );
  const paths = url.split('/');
  const breadcrumbItems = paths.map((path, index) => {
    const arrows = index !== paths.length - 1 ? ' / ' : '';
    if (path === 'courses') {
      return (
        <li
          className={styles.breadcrumbItem}
          key={shortid()}
        >
          <a
            href="#"
            onClick={navigateToDiscovery}
          >
            {path}
          </a>
          {arrows}
        </li>
      );
    }
    return (
      <li
        className={styles.breadcrumbItem}
        key={shortid()}
      >
        <span>{path}</span>
        {arrows}
      </li>
    );
  });
  return (
    <nav aria-label="breadcrumb">
      <ul className={styles.breadcrumbList}>
        {breadcrumbItems}
      </ul>
    </nav>
  );
};

export default CoursewareBreadcrumbs;
