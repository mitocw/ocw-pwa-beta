/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { getCoursewaresByIds } from '../datocms/query-datocms';
import CoursewareLoading from './courseware-loading';
import CoursewareCard from './courseware-card';
import shortid from '../scripts/shortid';
import styles from './courseware-list.module.scss';

const CoursewareFavoriteList = () => {
  const [coursewares, setCoursewares] = useState([]);
  const [loading, setLoading] = useState(true);
  const favoriteCourses = JSON.parse(window.localStorage.getItem('favoriteCourses') || '[]');

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setCoursewares([]);
      const result = await getCoursewaresByIds(favoriteCourses);
      setCoursewares(result);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return <CoursewareLoading />;
  }

  const coursewareCards = coursewares.map(courseware => (
    <CoursewareCard courseware={courseware} cardType="condensed" favoriteCourses={favoriteCourses} key={shortid()} />
  ));
  const coursewareListClasses = `${styles.coursewareList} ${styles.coursewareListCondensed}`;

  return (
    <div className={coursewareListClasses}>
      {coursewareCards}
    </div>
  );
};

export default CoursewareFavoriteList;
