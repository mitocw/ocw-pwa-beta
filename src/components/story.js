/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Markdown from 'markdown-to-jsx';
import styles from './story.module.scss';

const Story = ({ story, selectedStoryUid }) => {
  const {
    id,
    _updatedAt,
    title,
    author,
    featuredUserImage,
    body,
  } = story;

  const getDate = (date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return `${months[date.getMonth()]} ${date.getUTCDate()}, ${date.getFullYear()}`;
  };

  const date = getDate(new Date(_updatedAt));

  return selectedStoryUid === id
    ? (
      <div className={styles.story} data-story-uid={id}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <small>
            By {author} | Updated on {date}
          </small>
        </div>
        <div>
          <img src={featuredUserImage.responsiveImage.src} className={styles.image} alt="jm" />
          <Markdown>{body}</Markdown>
        </div>
        <div className={styles.footer}>
          We hope you’ve been inspired by this story and by OCW’s effort to meet the needs of
          learners eager to enhance their knowledge, lift up their communities, and change the
          world for the benefit of everyone. Please consider
          {' '}
          <a href="https://giving.mit.edu/give/to/ocw/">supporting our work with a donation</a>.
          {' '}
          We’d appreciate it!
        </div>
      </div>
    )
    : null;
};

export default Story;
