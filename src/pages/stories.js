/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useCallback } from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerContent,
} from '@rmwc/drawer';
import Store from '../store/store';
import useSiteMetadata from '../hooks/use-site-metadata';
import useStoriesQuery from '../hooks/use-stories-query';
import SEO from '../components/seo';
import Layout from '../components/layout';
import Story from '../components/story';
import StoryList from '../components/story-list';
import shortid from '../scripts/shortid';
import './stories.scss';

const StoriesPage = () => {
  const {
    initSelectedStory,
  } = Store.useContainer();
  const { siteMetadata } = useSiteMetadata();
  const { data, loading } = useStoriesQuery();
  const [selectedStory, setSelectedStory] = useState(initSelectedStory);
  const changeSelectedStory = useCallback(
    event => setSelectedStory(event.currentTarget.getAttribute('data-story-uid')),
  );

  if (loading) {
    return (
      <div className="spinner-container">
        <FaCircleNotch className="spinner" />
      </div>
    );
  }

  const { allStories } = data;
  const stories = allStories.map(story => (
    <Story
      story={story}
      selectedStoryUid={selectedStory}
      key={shortid()}
    />
  ));

  const result = (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <div className="featured-stories-container">
        <div className="drawer-container">
          <Drawer>
            <DrawerHeader>
              <DrawerTitle>OCW Stories</DrawerTitle>
            </DrawerHeader>
            <DrawerContent>
              <StoryList
                stories={allStories}
                selectedStory={selectedStory}
                changeSelectedStory={changeSelectedStory}
              />
            </DrawerContent>
          </Drawer>
        </div>
        <div className="stories-container">
          {stories}
        </div>
      </div>
    </Layout>
  );
  return result;
};

export default StoriesPage;
