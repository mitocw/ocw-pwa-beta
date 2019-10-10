import React, { useState, useEffect } from 'react';
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
