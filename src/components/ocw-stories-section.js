import React from 'react';
import OcwStoriesHeader from './ocw-stories-header';
import OcwStories from './ocw-stories';
import styles from './ocw-stories-section.module.scss';

const OcwStoriesSection = ({ title, description, stories }) => (
  <div className={styles.container}>
    <OcwStoriesHeader title={title} description={description} />
    <OcwStories stories={stories} />
  </div>
);

export default OcwStoriesSection;
