/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { List } from '@rmwc/list';
import VideoListItem from './video-list-item';
import shortid from '../scripts/shortid';

const VideoList = ({ videos, selectedVideo, changeSelectedVideo }) => {
  const videoListItems = videos.map(video => (
    <VideoListItem
      video={video}
      selectedVideo={selectedVideo}
      changeSelectedVideo={changeSelectedVideo}
      key={shortid()}
    />
  ));

  return (
    <List>
      {videoListItems}
    </List>
  );
};

export default VideoList;
