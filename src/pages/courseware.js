import React from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';
import useCoursewareData from '../hooks/use-courseware-data';
import SEO from '../components/seo';
import Layout from '../components/layout';
import CoursewareHeader from '../components/courseware-header';
import CoursewareImage from '../components/courseware-image';
import CoursewareMetadata from '../components/courseware-metadata';
import styles from './courseware.module.scss';

const CoursewarePage = ({ location }) => {
  const { siteMetadata } = useSiteMetadata();
  // During build, location.search is an empty string
  const hasParams = (location.search !== '');
  const coursewareUid = hasParams ? (new URL(location.href)).searchParams.get('courseware_uid') : null;
  const courseware = coursewareUid ? useCoursewareData(coursewareUid) : null;
  let result;
  if (courseware) {
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
    } = courseware;

    // TODO: move into separate component
    const courseDescriptionEl = (
      <>
        <h4>Course Description</h4>
        {/* eslint-disable react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: `${description.description}` }} />
        <a href={`https://ocw.mit.edu/${url}`}>Course Link</a>
      </>
    );
    // TODO: move into separate component
    const coursePagesEl = coursePages.map(coursePage => (
      <>
        <h4>{coursePage.title}</h4>
        <div dangerouslySetInnerHTML={{ __html: `${coursePage.text.text}` }} />
      </>
    ));

    result = (
      <Layout>
        <SEO
          siteTitle={siteMetadata.title}
          siteDescription={siteMetadata.description}
        />
        <div className={styles.courseware}>
          <CoursewareHeader
            className={styles.header}
            url={courseware.url}
            title={title}
          />
          <CoursewareImage
            className={styles.image}
            imageSrc={imageSrc}
            imageDescription={imageDescription.imageDescription}
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
          <div className={styles.description}>
            {courseDescriptionEl}
          </div>
          <div className={styles.pages}>
            {coursePagesEl}
          </div>
        </div>
      </Layout>
    );
  } else {
    // Empty page for server rendered; error message for erroneous courseUid param
    result = location.href ? (<p>Not a valid course identificator</p>) : null;
  }

  return result;
};

export default CoursewarePage;
