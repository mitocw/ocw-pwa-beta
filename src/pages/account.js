import React, { useState, useCallback } from 'react';
import { Tab, TabBar } from '@rmwc/tabs';
import useSiteMetadata from '../hooks/use-site-metadata';
import { getProfile } from '../scripts/auth';
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
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { siteMetadata } = useSiteMetadata();
  const onActivate = useCallback(
    event => setActiveTabIndex(event.detail.index),
  );

  const user = getProfile();

  const favoriteCoursewaresContent = activeTabIndex === 0
    ? (
      <CoursewareFavoriteList />
    )
    : null;

  const userContent = activeTabIndex === 1
    ? (
      <User user={user} />
    )
    : null;

  return (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <TabBar
        activeTabIndex={activeTabIndex}
        onActivate={onActivate}
      >
        <Tab className="account-tab">
          My courses
        </Tab>
        <Tab className="account-tab">
          {user.name}
        </Tab>
      </TabBar>
      <div className="account-tab-content">
        {favoriteCoursewaresContent}
        {userContent}
      </div>
    </Layout>
  );
};

export default AccountPage;
