/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import styles from './external-video.module.scss';

const ExternalVideo = ({
  youtubeId,
  youtubeTitle,
  openVideo,
  videoImageRef,
  displayAsThumbnail,
}) => {
  // To load a thumbnail of a YouTube video:
  // https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api#2068371

  const videoEl = displayAsThumbnail
    ? (
      <img
        className={styles.videoImage}
        src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt={youtubeTitle}
        tabIndex="0"
        role="button"
        onClick={openVideo}
        onKeyDown={openVideo}
        data-youtube-id={youtubeId}
        ref={videoImageRef}
      />
    )
    : (
      <iframe
        className={styles.videoIframe}
        width="965"
        height="543"
        title={youtubeTitle}
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );

  return (
    <div className={styles.videoContainer}>
      {videoEl}
    </div>
  );
};

export default ExternalVideo;
