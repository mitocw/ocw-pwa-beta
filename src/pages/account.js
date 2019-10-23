import React from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';
import { login, isAuthenticated, getProfile } from '../scripts/auth';
import SEO from '../components/seo';
import Layout from '../components/layout';

const User = ({ user }) => (
  <div>
    <p>
      Your name is
      {' '}
      {user.name}
    </p>
  </div>
);

const AccountPage = () => {
  const { siteMetadata } = useSiteMetadata();

  if (!isAuthenticated()) {
    login();
    return <p>Redirecting to login...</p>;
  }

  const user = getProfile();

  return (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <User user={user} />
    </Layout>
  );
};

export default AccountPage;
