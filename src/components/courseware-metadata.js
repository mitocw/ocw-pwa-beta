import React from 'react';
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
}) => {
  const instructorsEl = instructors.map(instructor => (
    <p key={shortid.generate()}>
      {`${validate('directoryTitle', instructor.directoryTitle)} ${instructor.firstName} ${instructor.lastName}`}
    </p>
  ));

  return (
    <div className={className}>
      <h4 className={styles.instructorsHeader}>Instructor(s)</h4>
      {instructorsEl}
      <h4>MIT Course Number</h4>
      <p>{`${departmentNumber}.${masterCourseNumber}`}</p>
      <h4>As Taught In</h4>
      <p>{`${fromSemester} ${fromYear}`}</p>
      <h4>Level</h4>
      <p>{courseLevel}</p>
    </div>
  );
};

export default CoursewareMetadata;
