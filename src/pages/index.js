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
import '../styles/global.scss';
import styles from './index.module.scss';
import userStyles from '../components/ocw-users.module.scss';

const IndexPage = () => {
  const [lifelongLearnerCourseId, setlifelongLearnerCourseId] = useState('');
  const [studentCourseId, setStudentCourseId] = useState('');
  const [educatorCourseId, setEducatorCourseId] = useState('');

  const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

  const { siteMetadata } = useSiteMetadata();
  const client = useContext(FaunaContext);

  useEffect(() => {
    const getData = async () => {
      let result;
      result = await getLifelongLearnerCourseIds();
      setlifelongLearnerCourseId(randomItem(result));
      result = await getStudentCourseIds();
      setStudentCourseId(randomItem(result));
      result = await getEducatorCourseIds();
      setEducatorCourseId(randomItem(result));
    };
    const getFaunaData = async (user) => {
      // Check if user already exists in FaunaDb
      const result0 = await client.query(
        q.Map(
          q.Paginate(
            q.Match(q.Index('all_users')),
          ),
          q.Lambda('X', q.Get(q.Var('X'))),
        ),
      );
      const users = result0.data;
      // User does not exist in FaunaDB, create it
      if (users && !users.find(el => el.data.name === user)) {
        // Create
        const result1 = await client.query(
          q.Create(
            q.Collection('users'), {
              data: {
                name: 'John',
                preferredCourses: ['1', '2', '3'],
              },
            },
          ),
        );
        console.log('Create', result1.ref, result1.data);
        // Read
        const result2 = await client.query(
          q.Get(
            q.Match(q.Index('users_by_name'), 'John'),
          ),
        );
        console.log('Read', result2.ref, result2.data);
        // Update
        const result3 = await client.query(
          q.Update(result2.ref, {
            data: {
              preferredCourses: ['1', '2', '3', '4'],
            },
          }),
        );
        console.log('Update', result3.ref, result3.data);
        // Delete
        const result4 = await client.query(
          q.Delete(result2.ref),
        );
        console.log('Delete', result4.ref, result4.data);
      }
      return null;
    };
    getData();
    getFaunaData('Some name');
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
            <OcwUserCard id={lifelongLearnerCourseId} />
          </div>
          <div>
            <p className={userStyles.cardDescription}>Educators view...</p>
            <OcwUserCard id={educatorCourseId} />
          </div>
          <div>
            <p className={userStyles.cardDescription}>Students view...</p>
            <OcwUserCard id={studentCourseId} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
