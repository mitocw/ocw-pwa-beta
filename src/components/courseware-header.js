/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import { Tooltip } from '@rmwc/tooltip';
import {
  MdBookmark,
  MdBookmarkBorder,
  MdCloudDownload,
  MdCloudDone,
} from 'react-icons/md';
import CoursewareBreadcrumb from './courseware-breadcrumb';
import styles from './courseware-header.module.scss';

const CoursewareHeader = ({
  className,
  url,
  title,
  visits,
  isAuthenticated,
  favorite,
  changeFavorite,
  synced,
  syncCourseware,
}) => {
  const favoriteHandleClick = useCallback(
    () => {
      changeFavorite(!favorite);
    },
  );
  const syncHandleClick = useCallback(
    () => {
      syncCourseware(!synced);
    },
  );
  const filledFavoriteIcon = isAuthenticated()
    ? (
      <Tooltip content="Remove bookmark" showArrow>
        <MdBookmark />
      </Tooltip>
    )
    : (
      <Tooltip content="Please log in to bookmark course" showArrow>
        <MdBookmark />
      </Tooltip>
    );
  const hollowFavoriteIcon = isAuthenticated()
    ? (
      <Tooltip content="Add bookmark" showArrow>
        <MdBookmarkBorder />
      </Tooltip>
    )
    : (
      <Tooltip content="Please log in to bookmark course" showArrow>
        <MdBookmarkBorder />
      </Tooltip>
    );
  const favoriteIcon = favorite ? filledFavoriteIcon : hollowFavoriteIcon;
  const syncIcon = !synced
    ? (
      <Tooltip content="Sync for offline use" showArrow>
        <MdCloudDownload />
      </Tooltip>
    )
    : (
      <Tooltip content="Unsync from local storage" showArrow>
        <MdCloudDone />
      </Tooltip>
    );
  return (
    <div className={className}>
      <div className={styles.subheader}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{title}</h3>
          <span
            className={styles.icon}
            onClick={favoriteHandleClick}
          >
            {favoriteIcon}
          </span>
          <span
            className={styles.icon}
            onClick={syncHandleClick}
          >
            {syncIcon}
          </span>
        </div>
        <h5 className={styles.visits}>
          Visits:&nbsp;
          {visits}
        </h5>
      </div>
      <CoursewareBreadcrumb url={url} />
    </div>
  );
};

export default CoursewareHeader;
