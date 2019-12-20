/* eslint-disable react/no-danger */
import React from 'react';
import Collapsible from './collapsible';

const CoursewareDescription = ({ className, description, url }) => (
  <Collapsible className={className} title="Course Description" startOpen>
    <div dangerouslySetInnerHTML={{ __html: `${description}` }} />
    <a href={`https://ocw.mit.edu/${url}`}>Course Link</a>
  </Collapsible>
);

export default CoursewareDescription;
