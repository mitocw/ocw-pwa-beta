/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react';
import Card, {
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons,
} from '@material/react-card';
import Button from '@material/react-button';
import { MdFavorite, MdFavoriteBorder, MdShare } from 'react-icons/md';
import TextTruncate from 'react-text-truncate';
import { navigate } from 'gatsby';
import striptags from 'striptags';
import useCoursewareCardData from '../hooks/use-courseware-card-data';
import styles from './courseware-card.module.scss';

const CoursewareCard = ({ coursewareUid }) => {
  const [favorite, setFavorite] = useState(0);
  const favoriteIcon = favorite ? (
    <MdFavorite />
  ) : (
    <MdFavoriteBorder />
  );
  const buttonHandleClick = useCallback(
    () => {
      navigate(`courseware/?courseware_uid=${coursewareUid}`);
    },
  );
  const favoriteHandleClick = useCallback(
    () => setFavorite(!favorite),
  );
  const {
    title,
    courseLevel,
    department,
    trackingTitle,
    imageSrc,
    description,
  } = useCoursewareCardData(coursewareUid);

  return (
    <Card className={styles.card}>
      <TextTruncate
        className={styles.title}
        line={1}
        element="span"
        truncateText="…"
        text={title}
      />
      <span className={styles.subtitle}>{`${courseLevel} Level`}</span>
      <CardMedia
          title={trackingTitle}
          wide
          imageUrl={imageSrc}
      />
      <TextTruncate
        className={styles.subsubtitle}
        line={1}
        element="span"
        truncateText="…"
        text={`Department: ${department[0].title}`}
      />
      <TextTruncate
        className={styles.description}
        line={2}
        element="span"
        truncateText="…"
        text={striptags(description.description)}
      />
      <CardActions className={styles.actions}>
        <CardActionButtons>
          <Button
            className={styles.button}
            dense
            onClick={buttonHandleClick}
          >
            Go to Course
          </Button>
        </CardActionButtons>
        <CardActionIcons>
          <span
            className={styles.icon}
            onClick={favoriteHandleClick}
          >
            {favoriteIcon}
          </span>
          <span className={styles.icon}><MdShare /></span>
        </CardActionIcons>
      </CardActions>
    </Card>
  );
};

export default CoursewareCard;
