/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
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
import { isAuthenticated } from '../scripts/auth';
import './courseware-card.scss';

// TODO: Replace departmentNumber by department once this field is present in DatoCMS
const CoursewareCard = ({ courseware, cardType, favoriteCourses }) => {
  const [favorite, setFavorite] = useState(favoriteCourses.includes(courseware.id));

  const favoriteIcon = favorite ? (
    <MdFavorite />
  ) : (
    <MdFavoriteBorder />
  );
  const navigateToCourseware = useCallback(
    () => {
      navigate(`courseware/?courseware_uid=${courseware.id}`);
    },
  );
  const favoriteHandleClick = useCallback(
    () => {
      if (isAuthenticated()) {
        let newFavoriteCourses = JSON.parse(window.localStorage.getItem('favoriteCourses') || '[]');
        if (favorite) {
          const index = newFavoriteCourses.indexOf(courseware.id);
          newFavoriteCourses.splice(index, 1);
        } else {
          newFavoriteCourses = [...newFavoriteCourses, courseware.id];
        }
        setFavorite(!favorite);
        window.localStorage.setItem('favoriteCourses', JSON.stringify(newFavoriteCourses));
      }
    },
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
        <Card className="courseware-card">
          <TextTruncate
            containerClassName="courseware-card-title"
            line={1}
            element="span"
            truncateText="…"
            text={title}
          />
          <span className="courseware-card-subtitle">{`${departmentNumber}.${masterCourseNumber}, ${courseLevel} Level`}</span>
          <CardMedia
              title={trackingTitle}
              wide
              imageUrl={imageSrc}
          />
          <TextTruncate
            containerClassName="courseware-card-subsubtitle"
            line={1}
            element="span"
            truncateText="…"
            text={`Department: ${departmentNumber}`}
          />
          <TextTruncate
            containerClassName="courseware-card-description"
            line={2}
            element="span"
            truncateText="…"
            text={striptags(description)}
          />
          <CardActions className="courseware-card-actions">
            <CardActionButtons>
              <Button
                className="courseware-card-button"
                dense
                onClick={navigateToCourseware}
              >
                Go to Course
              </Button>
            </CardActionButtons>
            <CardActionIcons>
              <span
                className="courseware-card-icon"
                onClick={favoriteHandleClick}
              >
                {favoriteIcon}
              </span>
              <span className="courseware-card-icon"><MdShare /></span>
            </CardActionIcons>
          </CardActions>
        </Card>
      );
    // ##### Condensed Card #####
    case 'condensed':
      return (
        <Card className="courseware-card courseware-card-condensed">
          <div className="courseware-card-header">
            <div className="courseware-card-text-container">
              <div>
                <TextTruncate
                  containerClassName="courseware-card-title"
                  line={1}
                  element="span"
                  truncateText="…"
                  text={title}
                />
              </div>
              <div className="courseware-card-subtitle">{`${courseLevel} Level`}</div>
            </div>
            <img src={imageSrc} alt={trackingTitle} className="courseware-card-thumbnail" />
          </div>
          <CardActions className="courseware-card-actions courseware-card-actions-condensed">
            <CardActionButtons>
              <Button
                className="courseware-card-button"
                dense
                onClick={navigateToCourseware}
              >
                Go to Course
              </Button>
            </CardActionButtons>
            <CardActionIcons>
              <span
                className="courseware-card-icon"
                onClick={favoriteHandleClick}
              >
                {favoriteIcon}
              </span>
              <span className="courseware-card-icon"><MdShare /></span>
            </CardActionIcons>
          </CardActions>
        </Card>
      );
    // ##### Text Card #####
    case 'text':
      return (
        <div className="courseware-card-text-card">
          <p>
            <a
              href="#"
              className="courseware-card-title"
              onClick={navigateToCourseware}
            >
              {title}
            </a>
          </p>
          <p className="courseware-card-subtitle">
            {`${departmentNumber}.${masterCourseNumber}, ${courseLevel} Level`}
          </p>
          <TextTruncate
            containerClassName="courseware-card-description"
            line={1}
            element="span"
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
