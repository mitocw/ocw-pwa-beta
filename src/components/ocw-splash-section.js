import React from 'react';
import styles from './ocw-splash-section.module.scss';

const OcwSplashSection = ({
  image,
  imageLede,
  videos,
}) => {
  const videosEl = videos.map(video => (
    <>
      <div className={styles.videoGroup}>
        <div>
          <div className={styles.videoContainer}>
            <iframe
              className={styles.videoIframe}
              width="965"
              height="543"
              title={videos.title}
              src={`https://www.youtube.com/embed/${video.youtubeUrl.providerUid}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div>
          <h4>{video.title}</h4>
          <p>{video.description}</p>
        </div>
      </div>
    </>
  ));
  const divStyle = {
    backgroundImage: `url(${image.responsiveImage.src})`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.image} style={divStyle}>
        <h3>{imageLede}</h3>
      </div>
      <div className={styles.videos}>
        {videosEl}
      </div>
    </div>
  );
};

export default OcwSplashSection;
