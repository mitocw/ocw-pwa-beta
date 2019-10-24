import React, { useState, useCallback } from 'react';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';
import useSiteMetadata from '../hooks/use-site-metadata';
import { login, isAuthenticated, getProfile } from '../scripts/auth';
import SEO from '../components/seo';
import Layout from '../components/layout';
import CoursewareFavoriteList from '../components/courseware-favorite-list';
import './account.scss';

const User = ({ user }) => (
  <div className="account-user">
    {`You are logged in as ${user.name}`}
  </div>
);

const AccountPage = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const { siteMetadata } = useSiteMetadata();
  const handleActiveIndexUpdate = useCallback(
    index => setActiveIndex(index),
  );

  if (!isAuthenticated()) {
    login();
    return <p>Redirecting to login...</p>;
  }

  const user = getProfile();

  const userContent = activeIndex === 0
    ? (
      <User user={user} />
    )
    : null;

  const favoriteCoursesContent = activeIndex === 1
    ? (
      <CoursewareFavoriteList />
    )
    : null;

  return (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <TabBar
        activeIndex={activeIndex}
        handleActiveIndexUpdate={handleActiveIndexUpdate}
      >
        <Tab className="account-tab">
          User
        </Tab>
        <Tab className="account-tab">
          Favorite courses
        </Tab>
      </TabBar>
      <div className="account-tab-content">
        {userContent}
        {favoriteCoursesContent}
      </div>
    </Layout>
  );
};

export default AccountPage;
