import React from 'react';
import Markdown from 'markdown-to-jsx';
// import styles from './ocw-users.module.scss';

const OcwStoriesHeader = ({ title, description }) => (
  <div>
    <h3>{title}</h3>
    <Markdown>{description}</Markdown>
  </div>
);

export default OcwStoriesHeader;
