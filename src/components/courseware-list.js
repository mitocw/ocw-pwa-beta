import React, { useState, useEffect, useContext } from 'react';
import { IconButton } from '@rmwc/icon-button';
import { MdCropPortrait, MdApps, MdDehaze } from 'react-icons/md';
import { query as q } from 'faunadb';
import { FaunaContext } from '../faunadb/client';
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
  const [favoriteCoursewares, setFavoriteCoursewares] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const client = useContext(FaunaContext);

  useEffect(() => {
    const getData = async () => {
      setDataLoading(true);
      setCoursewares([]);
      setFavoriteCoursewares([]);
      // Remove non-alphanumeric chars
      const alphanumericCourseSearch = courseSearch.replace(/[^0-9a-z]/gi, '');
      const result = await getCoursewares(
        alphanumericCourseSearch, courseTopic, courseFeature, courseLevel,
      );
      setCoursewares(result);
      if (isAuthenticated()) {
        // Get user name from local storage
        const user = window.localStorage.getItem('userName') || '';
        // Check if user already exists in FaunaDb
        const initResult = await client.query(
          q.Map(
            q.Paginate(
              q.Match(q.Index('all_users')),
            ),
            q.Lambda('X', q.Get(q.Var('X'))),
          ),
        );
        const users = initResult.data;
        // User does not exist in FaunaDB, create one
        // and populate favoriteCoursewares with empty array
        if (users && !users.find(el => el.data.name === user)) {
          // Create
          await client.query(
            q.Create(
              q.Collection('users'), {
                data: {
                  name: user,
                  favoriteCoursewares: [],
                },
              },
            ),
          );
        // User exists, fetch favoriteCoursewares
        } else {
          const readResult = await client.query(
            q.Get(
              q.Match(q.Index('users_by_name'), user),
            ),
          );
          setFavoriteCoursewares(readResult.data.favoriteCoursewares);
        }
      }
      setDataLoading(false);
    };
    getData();
  }, [courseSearch, courseTopic, courseFeature, courseLevel]);

  if (dataLoading) {
    return <CoursewareLoading />;
  }

  const coursewareNumber = coursewares.length.toString();
  const coursewareCards = coursewares.map(courseware => (
    <CoursewareCard
      courseware={courseware}
      cardType={cardType}
      favoriteCoursewares={favoriteCoursewares}
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
            icon={<MdCropPortrait />}
          />
          <IconButton
            data-card-type="condensed"
            onClick={changeCardType}
            icon={<MdApps />}
          />
          <IconButton
            data-card-type="text"
            onClick={changeCardType}
            icon={<MdDehaze />}
          />
        </div>
      </div>
      <div className={coursewareListClasses}>
        {coursewareCards}
      </div>
    </>
  );
};

export default CoursewareList;
