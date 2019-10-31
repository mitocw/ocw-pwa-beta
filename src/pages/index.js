import React, { useState, useEffect, useContext } from 'react';
import { query as q } from 'faunadb';
import { FaunaContext } from '../faunadb/client';
import useSiteMetadata from '../hooks/use-site-metadata';
import SEO from '../components/seo';
import Layout from '../components/layout';
import {
  getLifelongLearnerCourseIds,
  getEducatorCourseIds,
  getStudentCourseIds,
} from '../datocms/query-datocms';
import OcwUsers from '../components/ocw-users';
import OcwUserCard from '../components/ocw-user-card';
import { isAuthenticated } from '../scripts/auth';
import '../styles/global.scss';
import styles from './index.module.scss';
import userStyles from '../components/ocw-users.module.scss';

const IndexPage = () => {
  const [lifelongLearnerCourseId, setlifelongLearnerCourseId] = useState('');
  const [studentCourseId, setStudentCourseId] = useState('');
  const [educatorCourseId, setEducatorCourseId] = useState('');
  const [favoriteCoursewares, setFavoriteCoursewares] = useState([]);
  const client = useContext(FaunaContext);

  const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

  const { siteMetadata } = useSiteMetadata();

  useEffect(() => {
    const getData = async () => {
      let result;
      result = await getLifelongLearnerCourseIds();
      setlifelongLearnerCourseId(randomItem(result));
      result = await getStudentCourseIds();
      setStudentCourseId(randomItem(result));
      result = await getEducatorCourseIds();
      setEducatorCourseId(randomItem(result));
      setFavoriteCoursewares([]);
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
    };
    getData();
  }, []);

  return (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <div className={styles.index}>
        <h3>About OCW</h3>
        <p className={userStyles.ocwDescription}>
          Thousands of people utilize OCW to support their lifelong learning, career advancement,
          and instruction.
        </p>
        <h3>What type of OCW user are you?</h3>
        <OcwUsers />
        <div className={`${userStyles.cardList} ${userStyles.cardListBottom}`}>
          <div>
            <p className={userStyles.cardDescription}>Lifelong learners view...</p>
            <OcwUserCard
              id={lifelongLearnerCourseId}
              favoriteCoursewares={favoriteCoursewares}
            />
          </div>
          <div>
            <p className={userStyles.cardDescription}>Educators view...</p>
            <OcwUserCard
              id={educatorCourseId}
              favoriteCoursewares={favoriteCoursewares}
            />
          </div>
          <div>
            <p className={userStyles.cardDescription}>Students view...</p>
            <OcwUserCard
              id={studentCourseId}
              favoriteCoursewares={favoriteCoursewares}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
