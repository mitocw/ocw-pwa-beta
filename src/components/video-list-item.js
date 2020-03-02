/* eslint-disable react/jsx-one-expression-per-line */
import React, { useRef, useEffect } from 'react';
import { ListItem, ListItemText } from '@rmwc/list';
import { titleCase } from 'title-case';
import './video-list-item.scss';

const VideoListItem = ({ video, selectedVideo, changeSelectedVideo }) => {
  const {
    id,
    title,
  } = video;
  const listItemEl = useRef(null);

  useEffect(() => {
    if (id === selectedVideo) {
      listItemEl.current.focus();
    }
  }, []);

  return (
    <ListItem
      ref={listItemEl}
      data-video-uid={id}
      onClick={changeSelectedVideo}
    >
      <ListItemText>
        {titleCase(title)}
      </ListItemText>
    </ListItem>
  );
};

export default VideoListItem;
