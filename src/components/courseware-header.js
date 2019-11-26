/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import { MdCloudDownload, MdCloudDone } from 'react-icons/md';
import Tooltip from 'react-tooltip-lite';
import CoursewareBreadcrumb from './courseware-breadcrumb';
import styles from './courseware-header.module.scss';

const CoursewareHeader = ({
  className,
  url,
  title,
  visits,
  synced,
  syncCourseware,
}) => {
  const syncHandleClick = useCallback(
    () => {
      syncCourseware(!synced);
    },
  );
  const syncIcon = !synced
    ? (
      <Tooltip content="Sync for offline use">
        <MdCloudDownload />
      </Tooltip>
    )
    : (
      <Tooltip content="Unsync from local storage">
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
