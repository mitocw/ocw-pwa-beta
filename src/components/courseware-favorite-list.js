import React, { useState, useEffect, useContext } from 'react';
import { query as q } from 'faunadb';
import { FaunaContext } from '../faunadb/client';
import { getCoursewaresByIds } from '../datocms/query-datocms';
import CoursewareLoading from './courseware-loading';
import CoursewareCard from './courseware-card';
import { isAuthenticated } from '../scripts/auth';
import shortid from '../scripts/shortid';
import styles from './courseware-list.module.scss';

const CoursewareFavoriteList = () => {
  const [coursewares, setCoursewares] = useState([]);
  const [favoriteCoursewares, setFavoriteCoursewares] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const client = useContext(FaunaContext);

  useEffect(() => {
    const getData = async () => {
      setDataLoading(true);
      setFavoriteCoursewares([]);
      setCoursewares([]);
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
          const result = await getCoursewaresByIds(readResult.data.favoriteCoursewares);
          setFavoriteCoursewares(readResult.data.favoriteCoursewares);
          setCoursewares(result);
        }
      }
      setDataLoading(false);
    };
    getData();
  }, []);

  if (dataLoading) {
    return <CoursewareLoading />;
  }

  const coursewareCards = coursewares.map(courseware => (
    <CoursewareCard
      courseware={courseware}
      cardType="condensed"
      favoriteCoursewares={favoriteCoursewares}
      key={shortid()}
    />
  ));
  const coursewareListClasses = `${styles.coursewareList} ${styles.coursewareListCondensed}`;

  return (
    <div className={coursewareListClasses}>
      {coursewareCards}
    </div>
  );
};

export default CoursewareFavoriteList;
