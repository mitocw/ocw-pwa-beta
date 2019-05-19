import React, { useCallback } from 'react';
import Card, { CardMedia } from '@material/react-card';
import { navigate } from 'gatsby';
import styles from './courseware-card.module.scss';

const CoursewareCard = ({ courseware }) => {
  const cardHandleClick = useCallback(
    () => {
      navigate(`courseware/?courseware_uid=${courseware.id}`);
    },
  );
  return (
    <Card className={styles.card} onClick={cardHandleClick}>
      <CardMedia
          title={courseware.trackingTitle}
          wide
          imageUrl={courseware.imageSrc}
      />
      <h5>{courseware.trackingTitle}</h5>
    </Card>
  );
};

export default CoursewareCard;
