import React from 'react';
import styles from './courseware-card.module.scss';

const CoursewareMetadata = ({
  className,
  imageSrc,
  imageDescription,
}) => (
  <div className={className}>
    <div className={styles.imageContainer}>
      <img src={imageSrc} alt="TBD" title="TBD" />
    </div>
    <p>
      <small>{imageDescription}</small>
    </p>
  </div>
);

export default CoursewareMetadata;
