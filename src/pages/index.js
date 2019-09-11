import React from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';
import SEO from '../components/seo';
import Layout from '../components/layout';
import OcwUsers from '../components/ocw-users';
import OcwUserCard from '../components/ocw-user-card';
import '../styles/global.scss';
import styles from './index.module.scss';
import userStyles from '../components/ocw-users.module.scss';

const IndexPage = () => {
  const { siteMetadata } = useSiteMetadata();

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
            <OcwUserCard user="lifelong-learner" />
          </div>
          <div>
            <p className={userStyles.cardDescription}>Educators view...</p>
            <OcwUserCard user="educator" />
          </div>
          <div>
            <p className={userStyles.cardDescription}>Students view...</p>
            <OcwUserCard user="student" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
