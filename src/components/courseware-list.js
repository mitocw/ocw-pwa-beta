/* eslint-disable no-shadow */
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import IconButton from '@material/react-icon-button';
import { FaCircleNotch } from 'react-icons/fa';
import { MdCropPortrait, MdApps, MdDehaze } from 'react-icons/md';
import CoursewareCard from './courseware-card';
import shortid from '../scripts/shortid';
import styles from './courseware-list.module.scss';

const CoursewareList = ({
  courseTopic,
  courseLevel,
  cardType,
  changeCardType,
}) => {
  const GET_COURSEWARES = gql`
    query($courseLevelRegex: String!, $courseCollectionIds: [ItemId]) {
      allCoursewares(
        first: 100,
        orderBy: [title_ASC],
        filter: {
         courseLevel: {matches: {pattern: $courseLevelRegex}}
         courseCollections: {anyIn: $courseCollectionIds}
        }
      ) {
        id
        title
        courseLevel
        trackingTitle
        imageSrc
        description
        departmentNumber
        masterCourseNumber
     }
   }
 `;

  const GET_COURSEWARES_ALL_TOPICS = gql`
    query($courseLevelRegex: String!) {
      allCoursewares(
        first: 100,
        orderBy: [title_ASC],
        filter: {
         courseLevel: {matches: {pattern: $courseLevelRegex}}
        }
      ) {
        id
        title
        courseLevel
        trackingTitle
        imageSrc
        description
        departmentNumber
        masterCourseNumber
     }
   }
 `;

  const GET_COURSE_COLLECTIONS = gql`
    query($courseTopicRegex: String!) {
      allCourseCollections(
        first: 100,
        filter: {
          ocwFeature: {matches: {pattern: $courseTopicRegex}}
        }
      ) {
          id
        }
    }
  `;
  // Regular expressions
  // If courseTopic is all, we match against nothing since we will be using a different query
  // DatoCMS is limited at 100 records per query and we have 302 courseTopic records already
  // TODO: Implement pagination
  const courseTopicRegex = courseTopic === 'All' ? '$^' : `^${courseTopic}$`;
  const courseLevelRegex = courseLevel === 'All' ? '.*' : `^${courseLevel}$`;

  const COURSEWARE_QUERY = courseTopic === 'All' ? GET_COURSEWARES_ALL_TOPICS : GET_COURSEWARES;

  return (
    <Query query={GET_COURSE_COLLECTIONS} variables={{ courseTopicRegex }}>
      {({ data: { allCourseCollections }, loading }) => {
        if (loading) {
          return (
            <>
              <div className={styles.coursewareNumber}>
                <span>Courses</span>
              </div>
              <div className={styles.coursewareListLoading}>
                <FaCircleNotch className={styles.spinner} />
              </div>
            </>
          );
        }
        const courseCollectionIds = allCourseCollections
          .map(courseCollection => courseCollection.id);

        return (
          <Query query={COURSEWARE_QUERY} variables={{ courseLevelRegex, courseCollectionIds }}>
            {({ data: { allCoursewares }, loading }) => {
              if (loading) {
                return (
                  <>
                    <div className={styles.coursewareNumber}>
                      <span>Courses</span>
                    </div>
                    <div className={styles.coursewareListLoading}>
                      <FaCircleNotch className={styles.spinner} />
                    </div>
                  </>
                );
              }
              const coursewareNumber = allCoursewares.length.toString();
              const coursewareCards = allCoursewares.map(courseware => (
                <CoursewareCard courseware={courseware} cardType={cardType} key={shortid()} />
              ));
              const coursewareListClasses = cardType !== 'text'
                ? styles.coursewareList
                : `${styles.coursewareList} ${styles.coursewareListText}`;

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
            }}
          </Query>
        );
      }}
    </Query>
  );
};

export default CoursewareList;
