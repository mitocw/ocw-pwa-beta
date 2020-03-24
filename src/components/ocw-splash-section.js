/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, {
  useState,
  useCallback,
  useRef,
} from 'react';
import ModalVideo from 'react-modal-video';
import ExternalVideo from './external-video';
import shortid from '../scripts/shortid';
import styles from './ocw-splash-section.module.scss';

// TODO: there's a bug in react-modal-video that throws the following warning when ESC key is used
// to close the modal window:
//
// Can't perform a React state update on an unmounted component. This is a no-op, but it indicates
// a memory leak in your application.
// To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
//
// It comes from the following line:
// https://github.com/appleple/react-modal-video/blob/master/src/index.jsx#L20
// For the time being, just modify the npm module:
// node_modules/react-modal-video/lib/index


const OcwSplashSection = ({
  image,
  imageLede,
  videos,
}) => {
  const [openYoutubeId, setOpenYoutubeId] = useState('');
  const videoImageRefs = new Map();
  // Create an array of ref that will be used to give focus back to images if used
  videos.forEach(video => {
    videoImageRefs.set(video.youtubeUrl.providerUid, useRef(null));
  });

  const openVideo = useCallback(
    (event) => {
      // Open video on click or when "ENTER" is pressed
      if (event.type === 'click' || (event.type === 'keydown' && event.keyCode === 13)) {
        const youtubeId = event.currentTarget.getAttribute('data-youtube-id');
        setOpenYoutubeId(youtubeId);
      }
    },
  );

  const closeVideo = useCallback(
    () => {
      setOpenYoutubeId('');
      if (videoImageRefs.get(openYoutubeId)) {
        videoImageRefs.get(openYoutubeId).current.focus();
      }
    },
  );

  const getVideoEl = (youtubeId, youtubeTitle) => (
    <ExternalVideo
      youtubeId={youtubeId}
      youtubeTitle={youtubeTitle}
      openVideo={openVideo}
      videoImageRef={videoImageRefs.get(youtubeId)}
      displayAsThumbnail
    />
  );
  const getVideoModal = youtubeId => (
    <ModalVideo
      channel="youtube"
      isOpen={openYoutubeId === youtubeId}
      videoId={youtubeId}
      onClose={closeVideo}
      key={shortid()}
    />
  );

  const videosEl = videos.map(video => (
    <div key={shortid()}>
      <div className={styles.videoGroup}>
        <div>
          {getVideoEl(video.youtubeUrl.providerUid, video.title)}
        </div>
        <div>
          <h4>{video.title}</h4>
          <p>{video.description}</p>
        </div>
      </div>
    </div>
  ));
  const videoModalsEl = videos.map(video => getVideoModal(video.youtubeUrl.providerUid));

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
      {videoModalsEl}
    </div>
  );
};

export default OcwSplashSection;
