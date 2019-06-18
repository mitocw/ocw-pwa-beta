/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import useSiteMetadata from '../hooks/use-site-metadata';
import useIndexPageData from '../hooks/use-index-page-data';
import useStaticBlogData from '../hooks/use-static-blog-data';
import SEO from '../components/seo';
import Layout from '../components/layout';
import CoursewareList from '../components/courseware-list';
import shortid from '../scripts/shortid';

const IndexPage = () => {
  const { siteMetadata } = useSiteMetadata();
  const coursewareUids = useIndexPageData();
  // Static GraphQL Query
  const { posts } = useStaticBlogData();
  const postsEl = posts.map(post => (
    <div key={shortid()}>
      <p>{post.id}</p>
      <p>{post.title}</p>
      <p>{post.date}</p>
    </div>
  ));
  // Dynamic GraphQL Query
  const age = 34;
  const GET_USER_BY_AGE = gql`
  {
    users (where: {age_gt: ${age}}) {
      id
      firstname
      age
    }
  }
`;

  return (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <CoursewareList coursewareUids={coursewareUids} />
      <h3>Static GraphQL Query</h3>
      {postsEl}
      <h3>Dynamic GraphQL Query</h3>
      <Query query={GET_USER_BY_AGE}>
        {({ data, loading, error }) => {
          if (loading) {
            return (<p>Loading...</p>);
          }
          if (error) {
            return (
              <p>
                Error: ${error.message}
              </p>
            );
          }
          const { users } = data;
          const usersEl = users.map(user => (
            <div key={shortid()}>
              <p>{user.id}</p>
              <p>{user.firstname}</p>
              <p>{user.age}</p>
            </div>
          ));
          return usersEl;
        }}
      </Query>
    </Layout>
  );
};

export default IndexPage;
