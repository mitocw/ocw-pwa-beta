import React from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';
import useCoursewareData from '../hooks/use-courseware-data';
import SEO from '../components/seo';
import Layout from '../components/layout';
import shortid from '../scripts/shortid';
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
      trackingTitle,
      imageSrc,
      imageDescription,
      departmentNumber,
      masterCourseNumber,
      fromSemester,
      fromYear,
      courseLevel,
      description,
      url,
    } = courseware;
    let instructors;
    if (courseware.instructors) {
      instructors = courseware.instructors.map(instructor => (
        <p key={shortid.generate()}>
          {`${instructor.directoryTitle} ${instructor.firstName} ${instructor.lastName}`}
        </p>
      ));
    } else {
      instructors = (<p>N/A</p>);
    }

    result = (
      <Layout>
        <SEO
          siteTitle={siteMetadata.title}
          siteDescription={siteMetadata.description}
        />
        <div className={styles.courseware}>
          <div className={styles.title}>
            <h4>{trackingTitle}</h4>
            <div className={styles.imageContainer}>
              <img src={imageSrc} alt={trackingTitle} />
            </div>
            <p>
              {imageDescription.imageDescription}
            </p>
          </div>
          <div className={styles.metadata}>
            <h4>Instructor(s)</h4>
            {instructors}
            <h4>MIT Course Number</h4>
            <p>{`${departmentNumber}.${masterCourseNumber}`}</p>
            <h4>As Taught In</h4>
            <p>{`${fromSemester} ${fromYear}`}</p>
            <h4>Level</h4>
            <p>{courseLevel}</p>
          </div>
          <div className={styles.description}>
            <h4>Course Description</h4>
            {/* eslint-disable react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: `${description.description}` }} />
            <a href={`https://ocw.mit.edu/${url}`}>Course Link</a>
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
