/* eslint-disable react/no-danger */
import React from 'react';
import ExternalVideo from './external-video';
import Collapsible from './collapsible';
import shortid from '../scripts/shortid';
import styles from './courseware-pages.module.scss';

const CoursewarePages = ({ className, coursePages, courseVideos }) => {
  const coursePagesEl = coursePages.map(coursePage => {
    if (coursePage.pageType === 'CourseHomeSection') {
      return null;
    }
    if (!coursePage.videos) {
      return (
        <Collapsible className={styles.coursePage} title={coursePage.title} key={shortid()}>
          <div dangerouslySetInnerHTML={{ __html: `${coursePage.text ? coursePage.text : ''}` }} />
        </Collapsible>
      );
    }

    const coursePageVideoUids = coursePage.videos.split(',');
    const coursePageVideosEl = coursePageVideoUids.map(uid => {
      const video = courseVideos.find(el => el.uid === uid);
      return (
        <Collapsible className={styles.coursePage} title={video.title} key={shortid()}>
          <ExternalVideo
            youtubeId={video.youtubeStream}
            youtubeTitle={video.title}
          />
        </Collapsible>
      );
    });
    return (
      <Collapsible className={styles.coursePage} title={coursePage.title} key={shortid()}>
        {coursePageVideosEl}
      </Collapsible>
    );
  });
  return (
    <div className={className}>
      {coursePagesEl}
    </div>
  );
};

export default CoursewarePages;
