/* eslint-disable no-shadow */
import React from 'react';
import IconButton from '@material/react-icon-button';
import { MdCropPortrait, MdApps, MdDehaze } from 'react-icons/md';
import Store from '../store/store';
import useCoursewareQuery from '../hooks/use-courseware-query';
import useCourseCollectionQuery from '../hooks/use-course-collection-query';
import useCourseFeatureQuery from '../hooks/use-course-feature-query';
import CoursewareLoading from './courseware-loading';
import CoursewareCard from './courseware-card';
import shortid from '../scripts/shortid';
import styles from './courseware-list.module.scss';

const CoursewareList = () => {
  const {
    courseTopic,
    courseFeature,
    courseLevel,
    cardType,
    changeCardType,
  } = Store.useContainer();
  const { data: { allCourseCollections }, loading: collectionLoading } = useCourseCollectionQuery(
    courseTopic,
  );
  const courseCollectionIds = allCourseCollections
    ? allCourseCollections.map(courseCollection => courseCollection.id)
    : [];
  const { data: { allCourseFeatures }, loading: featureLoading } = useCourseFeatureQuery(
    courseFeature,
  );
  const courseFeatureIds = allCourseFeatures
    ? allCourseFeatures.map(courseFeature => courseFeature.id)
    : [];
  const { data: { allCoursewares }, loading: coursewareLoading } = useCoursewareQuery(
    courseTopic, courseFeature, courseLevel, courseCollectionIds, courseFeatureIds,
  );
  if (collectionLoading || featureLoading || coursewareLoading) {
    return <CoursewareLoading />;
  }

  const coursewareNumber = allCoursewares.length.toString();
  const coursewareCards = allCoursewares.map(courseware => (
    <CoursewareCard courseware={courseware} cardType={cardType} key={shortid()} />
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
