/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { List } from '@rmwc/list';
import StoryListItem from './story-list-item';
import shortid from '../scripts/shortid';

const StoryList = ({ stories, selectedStory, changeSelectedStory }) => {
  const storyListItems = stories.map(story => (
    <StoryListItem
      story={story}
      selectedStory={selectedStory}
      changeSelectedStory={changeSelectedStory}
      key={shortid()}
    />
  ));

  return (
    <List>
      {storyListItems}
    </List>
  );
};

export default StoryList;
