import React from 'react';
import { withBreakpoints } from 'react-breakpoints';
import Collapsible from './collapsible';
import shortid from '../scripts/shortid';
import validate from '../scripts/validate';
import styles from './courseware-metadata.module.scss';

const CoursewareMetadata = ({
  className,
  instructors,
  departmentNumber,
  masterCourseNumber,
  fromSemester,
  fromYear,
  courseLevel,
  currentBreakpoint,
  breakpoints,
}) => {
  const instructorsEl = instructors.map(instructor => (
    <p key={shortid.generate()}>
      {`${validate('directoryTitle', instructor.directoryTitle)} ${instructor.firstName} ${instructor.lastName}`}
    </p>
  ));

  const metadataEl = (
    <>
      <h4 className={styles.instructorsHeader}>Instructor(s)</h4>
      {instructorsEl}
      <h4>MIT Course Number</h4>
      <p>{`${departmentNumber}.${masterCourseNumber}`}</p>
      <h4>As Taught In</h4>
      <p>{`${fromSemester} ${fromYear}`}</p>
      <h4>Level</h4>
      <p>{courseLevel}</p>
    </>
  );

  const result = breakpoints[currentBreakpoint] < breakpoints.sm ? (
    <Collapsible className={className} title="Course Metadata">
      {metadataEl}
    </Collapsible>
  ) : (
    <div className={className}>
      {metadataEl}
    </div>
  );

  return result;
};

export default withBreakpoints(CoursewareMetadata);
