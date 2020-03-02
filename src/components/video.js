/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { titleCase } from 'title-case';
import Markdown from 'markdown-to-jsx';
import styles from './video.module.scss';

const Video = ({ video, selectedVideoUid }) => {
  const {
    id,
    title,
    externalVideo,
    captionText,
  } = video;

  return selectedVideoUid === id
    ? (
      <div className={styles.video} data-video-uid={id}>
        <h2 className={styles.title}>{titleCase(title)}</h2>
        <div className={styles.videoContainer}>
          <iframe
            className={styles.videoIframe}
            width={externalVideo.width}
            height={externalVideo.height}
            title={externalVideo.title}
            src={`https://www.youtube.com/embed/${externalVideo.providerUid}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className={styles.captions}>
          <Markdown>{captionText}</Markdown>
        </div>
      </div>
    )
    : null;
};

export default Video;
