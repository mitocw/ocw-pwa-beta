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
import styles from './courseware-card.module.scss';

// TODO: Replace departmentNumber by department once this field is present in DatoCMS
const CoursewareCard = ({ courseware, cardType }) => {
  const [favorite, setFavorite] = useState(0);
  const favoriteIcon = favorite ? (
    <MdFavorite />
  ) : (
    <MdFavoriteBorder />
  );
  const buttonHandleClick = useCallback(
    () => {
      navigate(`courseware/?courseware_uid=${courseware.id}&card_type=${cardType}`);
    },
  );
  const favoriteHandleClick = useCallback(
    () => setFavorite(!favorite),
  );
  const {
    title,
    courseLevel,
    trackingTitle,
    imageSrc,
    description,
    masterCourseNumber,
    departmentNumber,
  } = courseware;

  switch (cardType) {
    // ##### Regular Card #####
    case 'regular':
      return (
        <Card className={styles.card}>
          <TextTruncate
            containerClassName={styles.title}
            line={1}
            element="span"
            truncateText="…"
            text={title}
          />
          <span className={styles.subtitle}>{`${departmentNumber}.${masterCourseNumber}, ${courseLevel} Level`}</span>
          <CardMedia
              title={trackingTitle}
              wide
              imageUrl={imageSrc}
          />
          <TextTruncate
            containerClassName={styles.subsubtitle}
            line={1}
            element="span"
            truncateText="…"
            text={`Department: ${departmentNumber}`}
          />
          <TextTruncate
            containerClassName={styles.description}
            line={2}
            element="span"
            truncateText="…"
            text={striptags(description)}
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
    // ##### Condensed Card #####
    case 'condensed':
      return (
        <Card className={styles.card}>
          <div className={styles.header}>
            <div className={styles.textContainer}>
              <div>
                <TextTruncate
                  containerClassName={styles.title}
                  line={1}
                  element="span"
                  truncateText="…"
                  text={title}
                />
              </div>
              <div className={styles.subtitle}>{`${courseLevel} Level`}</div>
            </div>
            <img src={imageSrc} alt={trackingTitle} className={styles.thumbnail} />
          </div>
          <CardActions className={`${styles.actions} ${styles.actionsCondensed}`}>
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
    // ##### Text Card #####
    case 'text':
      return (
        <div className={styles.textCard}>
          <p>
            <a
              href={`courseware/?courseware_uid=${courseware.id}`}
              className={styles.title}
            >
              {title}
            </a>
          </p>
          <p className={styles.subtitle}>
            {`${departmentNumber}.${masterCourseNumber}, ${courseLevel} Level`}
          </p>
          <TextTruncate
            containerClassName={styles.description}
            line={1}
            element="p"
            truncateText="…"
            text={striptags(description)}
          />
        </div>
      );
    default:
      return null;
  }
};

export default CoursewareCard;
