/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { titleCase } from 'title-case';
import { Player, BigPlayButton } from 'video-react';
import styles from './internal-video.module.scss';

const InternalVideo = ({ video, selectedVideoUid }) => {
  const {
    id,
    title,
    videoName,
  } = video;

  return selectedVideoUid === id
    ? (
      <div className={styles.video} data-video-uid={id}>
        <h2>{titleCase(title)}</h2>
        <Player src={`${videoName.url}`}>
          <BigPlayButton position="center" />
        </Player>
      </div>
    )
    : null;
};

export default InternalVideo;

/*
  <video className={styles.videoInternal} controls preload="auto">
    <source src={`${videoName.url}`} type={`video/${videoName.format}`} />
  </video>
*/
