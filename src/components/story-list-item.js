/* eslint-disable react/jsx-one-expression-per-line */
import React, { useRef, useEffect } from 'react';
import { ListItem, ListItemText } from '@rmwc/list';
import './story-list-item.scss';

const StoryListItem = ({ story, selectedStory, changeSelectedStory }) => {
  const {
    id,
    featuredUser,
    featuredUserType,
    featuredUserCountry,
  } = story;
  const listItemEl = useRef(null);

  useEffect(() => {
    if (id === selectedStory) {
      listItemEl.current.focus();
    }
  }, []);

  return (
    <ListItem
      ref={listItemEl}
      data-story-uid={id}
      onClick={changeSelectedStory}
    >
      <ListItemText>
        {featuredUser}
        <br />
        <small>{featuredUserType}, {featuredUserCountry}</small>
      </ListItemText>
    </ListItem>
  );
};

export default StoryListItem;
