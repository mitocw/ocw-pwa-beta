import React, { useCallback } from 'react';
import Card, { CardMedia } from '@material/react-card';
import { navigate } from 'gatsby';
import styles from './courseware-card.module.scss';

const CoursewareCard = ({ courseware }) => {
  const cardHandleClick = useCallback(
    () => {
      navigate(`courseware/?course_uid=${courseware.courseUid}`);
    },
  );
  return (
    <Card className={styles.card} onClick={cardHandleClick}>
      <CardMedia
          title={courseware.courseTitle}
          wide
          imageUrl={courseware.courseImagePath}
      />
      <h5>{courseware.courseTitle}</h5>
    </Card>
  );
};

export default CoursewareCard;
