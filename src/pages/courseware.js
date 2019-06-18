import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { FaCircleNotch } from 'react-icons/fa';
import useSiteMetadata from '../hooks/use-site-metadata';
import SEO from '../components/seo';
import Layout from '../components/layout';
import CoursewareHeader from '../components/courseware-header';
import CoursewareImage from '../components/courseware-image';
import CoursewareMetadata from '../components/courseware-metadata';
import CoursewareDescription from '../components/courseware-description';
import CoursewarePages from '../components/courseware-pages';
import validate from '../scripts/validate';
import styles from './courseware.module.scss';
import '../components/courseware-filters.scss';

const CoursewarePage = ({ location }) => {
  const { siteMetadata } = useSiteMetadata();
  // During build, location.search is an empty string
  const hasParams = (location.search !== '');
  const coursewareUid = hasParams ? (new URL(location.href)).searchParams.get('courseware_uid') : null;
  let result;
  const GET_COURSEWARE = gql`
    query($coursewareUid: ItemId) {
      allCoursewares(
        filter: {
          id: {eq: $coursewareUid}
        }
      ) {
        trackingTitle
        title
        masterCourseNumber
        imageSrc
        imageDescription
        description
        url
        shortUrl
        courseLevel
        departmentNumber
        instructors {
          directoryTitle
          firstName
          lastName
        }
        tags {
          name
        }
        toSemester
        fromSemester
        toYear
        fromYear
        sortAs
        language
        coursePages {
          id
          title
          url
          shortUrl
          pageType
          text
        }
     }
   }
 `;
  if (coursewareUid) {
    result = (
      <Layout>
        <SEO
          siteTitle={siteMetadata.title}
          siteDescription={siteMetadata.description}
        />
        <Query query={GET_COURSEWARE} variables={{ coursewareUid }}>
          {({ data: { allCoursewares }, loading }) => {
            if (loading) {
              return (
                <div className="spinner-container">
                  <FaCircleNotch className="spinner" />
                </div>
              );
            }
            if (allCoursewares.length === 0) {
              return (<div className="spinner-container">Not a valid course identificator</div>);
            }
            // Get the fields of interest from valid courseware
            const {
              title,
              imageSrc,
              imageDescription,
              instructors,
              departmentNumber,
              masterCourseNumber,
              fromSemester,
              fromYear,
              courseLevel,
              description,
              url,
              coursePages,
            } = allCoursewares[0];
            return (
              <div className={styles.courseware}>
                <CoursewareHeader
                  className={styles.header}
                  url={url}
                  title={title}
                />
                <CoursewareImage
                  className={styles.image}
                  imageSrc={imageSrc}
                  imageDescription={validate('imageDescription', imageDescription)}
                />
                <CoursewareMetadata
                  className={styles.metadata}
                  instructors={instructors}
                  departmentNumber={departmentNumber}
                  masterCourseNumber={masterCourseNumber}
                  fromSemester={fromSemester}
                  fromYear={fromYear}
                  courseLevel={courseLevel}
                />
                <CoursewareDescription
                  className={styles.description}
                  description={description}
                  url={url}
                />
                <CoursewarePages
                  className={styles.pages}
                  coursePages={coursePages}
                />
              </div>
            );
          }}
        </Query>
      </Layout>
    );
  } else {
    // Error message for erroneous courseUid param
    result = location.href ? (<p>Not a valid course identificator</p>) : null;
  }

  return result;
};

export default CoursewarePage;
