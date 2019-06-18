/* eslint-disable react/no-danger */
import React from 'react';
import Collapsible from './collapsible';
import shortid from '../scripts/shortid';
import styles from './courseware-pages.module.scss';

const CoursewarePages = ({ className, coursePages }) => {
  const coursePagesEl = coursePages.map(coursePage => (
    <Collapsible className={styles.coursePage} title={coursePage.title} key={shortid()}>
      <div dangerouslySetInnerHTML={{ __html: `${coursePage.text ? coursePage.text : ''}` }} />
    </Collapsible>
  ));

  return (
    <div className={className}>
      {coursePagesEl}
    </div>
  );
};

export default CoursewarePages;
