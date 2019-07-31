import React from 'react';
import styles from './courseware-card.module.scss';

const CoursewareImage = ({
  className,
  imageSrc,
  imageDescription,
}) => (
  <div className={className}>
    <img src={imageSrc} className={styles.coursewareImage} alt="TBD" title="TBD" />
    <p>
      <small>{imageDescription}</small>
    </p>
  </div>
);

export default CoursewareImage;
