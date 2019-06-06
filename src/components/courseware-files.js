/* eslint-disable react/no-danger */
import React from 'react';
import shortid from '../scripts/shortid';

const CoursewareFiles = ({ courseFiles }) => {
  const courseFilesEl = courseFiles !== null
    ? courseFiles.map(courseFile => (
      <div key={shortid()}>
        <p>{courseFile.id}</p>
        <p>{courseFile.trackingTitle}</p>
        <p>{courseFile.title}</p>
        <p>{courseFile.fileType}</p>
        <p>{courseFile.fileLocation}</p>
      </div>
    ))
    : null;

  return courseFilesEl;
};

export default CoursewareFiles;
