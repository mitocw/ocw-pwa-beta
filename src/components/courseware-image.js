import React from 'react';
import './courseware-card.scss';

const CoursewareImage = ({
  className,
  imageSrc,
  imageDescription,
}) => (
  <div className={className}>
    <img src={imageSrc} className="courseware-image" alt="TBD" title="TBD" />
    <p>
      <small>{imageDescription}</small>
    </p>
  </div>
);

export default CoursewareImage;
