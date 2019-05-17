import React, { useCallback } from 'react';
import Card, { CardMedia } from '@material/react-card';

import styles from './courseware-card.module.scss';

const CoursewareCard = ({ node }) => {
  const cardHandleClick = useCallback(
    () => {
      /* global window */
      window.location.href = node.coursePath;
    }, [],
  );
  return (
    <Card className={styles.card} key={node.courseUid} onClick={cardHandleClick}>
      <CardMedia
          title={node.courseTitle}
          wide
          imageUrl={node.courseImagePath}
      />
      <h5>{node.courseTitle}</h5>
    </Card>
  );
};

export default CoursewareCard;
