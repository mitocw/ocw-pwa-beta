import React from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';
import { getProfile } from '../scripts/auth';
import SEO from '../components/seo';
import Layout from '../components/layout';
import CoursewareFavoriteList from '../components/courseware-favorite-list';
import './account.scss';

const User = ({ user }) => (
  <div className="account-user">
    <span>You are logged in as: </span>
    <span className="account-user-email">
      {user.name}
    </span>
  </div>
);

const AccountPage = () => {
  const { siteMetadata } = useSiteMetadata();
  const user = getProfile();

  return (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <User user={user} />
      <CoursewareFavoriteList />
    </Layout>
  );
};

export default AccountPage;
