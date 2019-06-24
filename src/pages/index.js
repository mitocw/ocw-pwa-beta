/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import useSiteMetadata from '../hooks/use-site-metadata';
import useIndexPageData from '../hooks/use-index-page-data';
import useDatoCMSData from '../hooks/use-dato-cms-data';
import SEO from '../components/seo';
import Layout from '../components/layout';
import CoursewareList from '../components/courseware-list';
import shortid from '../scripts/shortid';

const IndexPage = () => {
  const { siteMetadata } = useSiteMetadata();
  const coursewareUids = useIndexPageData();
  // Static DatoCMS GraphQL Query
  const staticCourseware = useDatoCMSData('DatoCmsCoursewareModel-1133388-en');
  const staticCoursewaresEl = (
    <div key={shortid()}>
      <p>{staticCourseware.id}</p>
      <p>{staticCourseware.trackingTitleField}</p>
      <p>{staticCourseware.titleField}</p>
    </div>
  );
  // Dynamic DatoCMS GraphQL Query
  const courseLevel = 'Undergraduate';
  const GET_COURSEWARE = gql`
  {
    allCoursewareModels(
      filter: {
        courseLevelField: {eq: ${courseLevel}}
      }
    ) {
      id
      trackingTitleField
      titleField
      masterCourseNumberField
      imageSrcField
      imageDescriptionField
      descriptionField
      urlField
      shortUrlField
      courseLevelField
      departmentNumberField
      toSemesterField
      fromSemesterField
      toYearField
      fromYearField
      sortAsField
      languageField
      instructorsField {
        firstNameField
        lastNameField
      }
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
      <h3>Static DatoCMS GraphQL Query</h3>
      { staticCoursewaresEl }
      <h3>Dynamic DatoCMS GraphQL Query</h3>
      <Query query={GET_COURSEWARE}>
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
          const { allCoursewareModels } = data;
          const coursewaresEl = allCoursewareModels.map((courseware) => {
            const {
              id,
              trackingTitleField,
              titleField,
              masterCourseNumberField,
              imageSrcField,
              imageDescriptionField,
              descriptionField,
              urlField,
              shortUrlField,
              courseLevelField,
              departmentNumberField,
              toSemesterField,
              fromSemesterField,
              toYearField,
              fromYearField,
              sortAsField,
              languageField,
              instructorsField,
            } = courseware;
            const instructorsEl = instructorsField.map(instructorField => (
              <p key={shortid()}>
                <span>Instructors: </span>
                <span>{instructorField.lastNameField} </span>
                <span>{instructorField.firstNameField}</span>
              </p>
            ));

            return (
              <div key={shortid()}>
                <p>{id}</p>
                <p>{trackingTitleField}</p>
                <p>{titleField}</p>
                <p>{masterCourseNumberField}</p>
                <p>{imageSrcField}</p>
                <p>{imageDescriptionField}</p>
                <p>{descriptionField}</p>
                <p>{urlField}</p>
                <p>{shortUrlField}</p>
                <p>{courseLevelField}</p>
                <p>{departmentNumberField}</p>
                <p>{toSemesterField}</p>
                <p>{fromSemesterField}</p>
                <p>{toYearField}</p>
                <p>{fromYearField}</p>
                <p>{sortAsField}</p>
                <p>{languageField}</p>
                {instructorsEl}
              </div>
            );
          });
          return coursewaresEl;
        }}
      </Query>
    </Layout>
  );
};

export default IndexPage;
