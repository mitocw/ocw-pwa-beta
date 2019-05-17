import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Layout from '../components/layout';
import CoursewareList from '../components/courseware-list';

const IndexPage = ({ data }) => {
  const { siteMetadata } = data.site;
  const coursewares = data.allContentfulAutoCourseware.edges;

  return (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <CoursewareList coursewares={coursewares} />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulAutoCourseware(sort: { fields: [courseTitle], order: ASC }) {
      edges {
        node {
          courseUid
          courseTitle
          courseImagePath
          coursePath
          department {
            name
          }
          speciality {
            title
          }
          subtopic {
            title
          }
          term
          trackingTitle
          year
        }
      }
    }
  }
`;
