import React from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';
import useContentfulData from '../hooks/use-contentful-data';
import SEO from '../components/seo';
import Layout from '../components/layout';
import shortid from '../scripts/shortid';
import styles from './courseware.module.scss';

const CoursewarePage = ({ location }) => {
  const { title, description } = useSiteMetadata();
  const coursewares = useContentfulData();
  // During build, location.search is an empty string
  const hasParams = (location.search !== '');
  const courseUid = hasParams ? (new URL(location.href)).searchParams.get('course_uid') : null;
  let courseware = null;
  if (courseUid) {
    coursewares.forEach((el) => {
      if (el.node.courseUid === courseUid) {
        courseware = el.node;
      }
    });
  }
  let result;
  if (courseware) {
    // Get the fields of interest from valid courseware
    const {
      courseTitle,
      courseImagePath,
      masterCourseNumber,
      term,
      year,
      coursewareLevel,
      coursewareDescription,
      coursePath,
    } = courseware;
    let instructors;
    if (courseware.instructors) {
      instructors = courseware.instructors.map(instructor => (
        <p key={shortid.generate()}>{instructor.name}</p>
      ));
    } else {
      instructors = (<p>N/A</p>);
    }

    result = (
      <Layout>
        <SEO
          siteTitle={title}
          siteDescription={description}
        />
        <div className={styles.courseware}>
          <div className={styles.title}>
            <h4>{courseTitle}</h4>
            <div className={styles.imageContainer}>
              <img src={courseImagePath} alt={courseTitle} />
            </div>
          </div>
          <div className={styles.metadata}>
            <h4>Instructor(s)</h4>
            {courseware ? instructors : null}
            <h4>MIT Course Number</h4>
            <p>{masterCourseNumber}</p>
            <h4>As Taught In</h4>
            <p>{`${term} ${year}`}</p>
            <h4>Level</h4>
            <p>{coursewareLevel}</p>
          </div>
          <div className={styles.description}>
            <h4>Course Description</h4>
            {/* eslint-disable react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: `${coursewareDescription}` }} />
            <a href={coursePath}>Course Link</a>
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
