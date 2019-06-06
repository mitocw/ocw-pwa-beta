import React from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';
import useCoursewareData from '../hooks/use-courseware-data';
import SEO from '../components/seo';
import Layout from '../components/layout';
import CoursewareHeader from '../components/courseware-header';
import CoursewareImage from '../components/courseware-image';
import CoursewareMetadata from '../components/courseware-metadata';
import CoursewareDescription from '../components/courseware-description';
import CoursewarePages from '../components/courseware-pages';
import CoursewareFiles from '../components/courseware-files';
import validate from '../scripts/validate';
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
      course_file,
    } = courseware;

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
          <CoursewareFiles
            courseFiles={course_file}
          />
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
