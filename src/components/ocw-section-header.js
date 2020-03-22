import React from 'react';
import Markdown from './markdown';

const OcwStoriesHeader = ({ title, description }) => (
  <div>
    <h3>{title}</h3>
    <Markdown content={description} />
  </div>
);

export default OcwStoriesHeader;
