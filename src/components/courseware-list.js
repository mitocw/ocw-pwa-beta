import React, { useState, useEffect } from 'react';
import IconButton from '@material/react-icon-button';
import { MdCropPortrait, MdApps, MdDehaze } from 'react-icons/md';
import Store from '../store/store';
import { getCoursewares } from '../datocms/query-datocms';
import CoursewareLoading from './courseware-loading';
import CoursewareCard from './courseware-card';
import { isAuthenticated } from '../scripts/auth';
import shortid from '../scripts/shortid';
import styles from './courseware-list.module.scss';

const CoursewareList = () => {
  const {
    courseSearch,
    courseTopic,
    courseFeature,
    courseLevel,
    cardType,
    changeCardType,
  } = Store.useContainer();

  const [coursewares, setCoursewares] = useState([]);
  const [loading, setLoading] = useState(true);
  const favoriteCourses = isAuthenticated()
    ? JSON.parse(window.localStorage.getItem('favoriteCourses') || '[]')
    : [];

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setCoursewares([]);
      // Remove non-alphanumeric chars
      const alphanumericCourseSearch = courseSearch.replace(/[^0-9a-z]/gi, '');
      const result = await getCoursewares(
        alphanumericCourseSearch, courseTopic, courseFeature, courseLevel,
      );
      setCoursewares(result);
      setLoading(false);
    };
    getData();
  }, [courseSearch, courseTopic, courseFeature, courseLevel]);

  if (loading) {
    return <CoursewareLoading />;
  }

  const coursewareNumber = coursewares.length.toString();
  const coursewareCards = coursewares.map(courseware => (
    <CoursewareCard
      courseware={courseware}
      cardType={cardType}
      favoriteCourses={favoriteCourses}
      key={shortid()}
    />
  ));
  let coursewareListClasses;
  switch (cardType) {
    case 'condensed':
      coursewareListClasses = `${styles.coursewareList} ${styles.coursewareListCondensed}`;
      break;
    case 'text':
      coursewareListClasses = `${styles.coursewareList} ${styles.coursewareListText}`;
      break;
    // Regular cards
    default:
      coursewareListClasses = `${styles.coursewareList}`;
  }

  return (
    <>
      <div className={styles.coursewareNumber}>
        <span>{`Courses (${coursewareNumber})`}</span>
        <div className={styles.cardTypes}>
          <IconButton
            data-card-type="regular"
            onClick={changeCardType}
          >
            <MdCropPortrait />
          </IconButton>
          <IconButton
            data-card-type="condensed"
            onClick={changeCardType}
          >
            <MdApps />
          </IconButton>
          <IconButton
            data-card-type="text"
            onClick={changeCardType}
          >
            <MdDehaze />
          </IconButton>
        </div>
      </div>
      <div className={coursewareListClasses}>
        {coursewareCards}
      </div>
    </>
  );
};

export default CoursewareList;
