/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import shortid from '../scripts/shortid';
import styles from './courseware-breadcrumb.module.scss';

const CoursewareBreadcrumbs = ({ url }) => {
  const paths = url.split('/');

  const breadcrumbItems = paths.map((path, index) => {
    const arrows = index !== paths.length - 1 ? ' / ' : '';
    return (
      <li
        className={styles.breadcrumbItem}
        key={shortid()}
      >
        <a href="#">{path}</a>
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
