/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import { navigate } from 'gatsby';
import Store from '../store/store';
import shortid from '../scripts/shortid';
import styles from './ocw-stories.module.scss';

const OcwStories = ({ stories }) => {
  const {
    setInitSelectedStory,
  } = Store.useContainer();

  const navigateToStories = useCallback(
    (event) => {
      setInitSelectedStory(event.currentTarget.getAttribute('data-story-uid'));
      navigate('stories');
    },
  );

  const storyCards = stories.map(story => (
    <div className={styles.card} key={shortid()}>
      <img
        className={styles.image}
        src={story.featuredUserImage.url}
        alt={story.featuredUser}
        data-story-uid={story.id}
        onClick={navigateToStories}
      />
      <h3 className={styles.title}>
        {story.title}
      </h3>
      <p className={styles.description}>
        {story.featuredUserLede}
      </p>
    </div>
  ));


  return (
    <div className={styles.cardList}>
      {storyCards}
    </div>
  );
};

export default OcwStories;
