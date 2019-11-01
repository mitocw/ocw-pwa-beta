/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback, useContext } from 'react';
import Card, {
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons,
} from '@material/react-card';
import Button from '@material/react-button';
import { MdFavorite, MdFavoriteBorder, MdShare } from 'react-icons/md';
import TextTruncate from 'react-text-truncate';
import Tooltip from 'react-tooltip-lite';
import { navigate } from 'gatsby';
import { query as q } from 'faunadb';
import striptags from 'striptags';
import copy from 'copy-to-clipboard';
import { FaunaContext } from '../faunadb/client';
import { isAuthenticated } from '../scripts/auth';
import './courseware-card.scss';

// TODO: Replace departmentNumber by department once this field is present in DatoCMS
const CoursewareCard = ({ courseware, cardType, favoriteCoursewares }) => {
  const [favorite, setFavorite] = useState(favoriteCoursewares.includes(courseware.id));
  const client = useContext(FaunaContext);

  const filledFavoriteIcon = isAuthenticated()
    ? (
      <MdFavorite />
    )
    : (
      <Tooltip content="Please log in to save course">
        <MdFavorite />
      </Tooltip>
    );
  const hollowFavoriteIcon = isAuthenticated()
    ? (
      <MdFavoriteBorder />
    )
    : (
      <Tooltip content="Please log in to save course">
        <MdFavoriteBorder />
      </Tooltip>
    );
  const favoriteIcon = favorite ? filledFavoriteIcon : hollowFavoriteIcon;
  const shareIcon = (
    <Tooltip content="Copy url to clipboard">
      <MdShare />
    </Tooltip>
  );
  const navigateToCourseware = useCallback(
    () => {
      navigate(`courseware/?courseware_uid=${courseware.id}`);
    },
  );
  const favoriteHandleClick = useCallback(
    () => {
      const updateFaunaDB = async () => {
        if (isAuthenticated()) {
          // Get user name from local storage
          const user = window.localStorage.getItem('userName') || '';
          // Get favorite courses from FaunaDB
          const readResult = await client.query(
            q.Get(
              q.Match(q.Index('users_by_name'), user),
            ),
          );
          let newFavoriteCoursewares = [...readResult.data.favoriteCoursewares];
          if (favorite) {
            const index = newFavoriteCoursewares.indexOf(courseware.id);
            newFavoriteCoursewares.splice(index, 1);
          } else {
            newFavoriteCoursewares = [...newFavoriteCoursewares, courseware.id];
          }
          setFavorite(!favorite);
          // Update favorite courses on FaunaDB
          await client.query(
            q.Update(readResult.ref, {
              data: {
                favoriteCoursewares: newFavoriteCoursewares,
              },
            }),
          );
        }
      };
      updateFaunaDB();
    },
  );
  const shareHandleClick = useCallback(
    () => {
      // Copy courseware url to clipboard
      copy(`${window.location.host}/courseware/?courseware_uid=${courseware.id}`);
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
              <span
                className="courseware-card-icon"
                onClick={shareHandleClick}
              >
                {shareIcon}
              </span>
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
              <span
                className="courseware-card-icon"
                onClick={shareHandleClick}
              >
                {shareIcon}
              </span>
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
